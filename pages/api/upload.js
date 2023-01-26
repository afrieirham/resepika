import { nanoid } from "nanoid";
import { client } from "../../utils/admin";
import { promiseFormatter } from "../../utils/promiseFormatter";

export default async function handler(req, res) {
  const { photoUrl, postUrl, title } = req.body;

  // Setup CMA client
  const [environment, envError] = await promiseFormatter(
    client
      .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
      .then((space) =>
        space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT)
      )
  );

  if (envError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to setup environment",
        error: envError,
      });

  // Upload asset to contentful
  const assetId = nanoid();
  const [asset, uploadError] = await promiseFormatter(
    environment.createAsset({
      fields: {
        title: {
          "en-US": assetId,
        },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: `${assetId}.jpg`,
            upload: photoUrl,
          },
        },
      },
    })
  );

  if (uploadError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to upload asset",
        error: uploadError,
      });

  // Process uploaded asset
  const [, processError] = await promiseFormatter(asset.processForAllLocales());
  if (processError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to process asset",
        error: processError,
      });

  const contentfulAssetId = asset.sys.id;

  // Create new recipe
  const [recipe, recipeError] = await promiseFormatter(
    environment.createEntry("recipe", {
      fields: {
        title: {
          "en-US": title,
        },
        postUrl: {
          "en-US": postUrl,
        },
        thumbnail: {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: contentfulAssetId,
            },
          },
        },
      },
      metadata: {
        tags: [
          {
            sys: {
              type: "Array",
              linkType: "Tag",
              id: "recipes",
            },
          },
        ],
      },
    })
  );

  if (recipeError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to add recipe",
        error: recipeError,
      });

  // Publish asset
  const [assetToPublish, getAssetError] = await promiseFormatter(
    environment.getAsset(contentfulAssetId)
  );
  if (getAssetError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to get asset",
        error: getAssetError,
      });

  // Publish recipe
  const [recipeToPublish, getRecipeError] = await promiseFormatter(
    environment.getEntry(recipe.sys.id)
  );
  if (getRecipeError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to get recipe",
        error: getRecipeError,
      });

  const [, assetPublishError] = await promiseFormatter(
    assetToPublish.publish()
  );
  if (assetPublishError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to publish asset",
        error: assetPublishError,
      });

  const [, recipePublishError] = await promiseFormatter(
    recipeToPublish.publish()
  );
  if (recipePublishError)
    return res
      .status(500)
      .json({
        status: false,
        message: "Fail to publish asset",
        error: recipePublishError,
      });

  res.json({ status: true, message: "Recipe uploaded successfully" });
}
