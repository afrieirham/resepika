import React from "react";
import { AspectRatio, Flex, Img, Link, Text } from "@chakra-ui/react";

function Recipe({ recipe }) {
  const hasImage = Boolean(recipe.thumbnail);
  const imageUrl = "/thumbnails/" + recipe.thumbnail;

  return (
    <Link href={recipe.postUrl} isExternal position="relative">
      <AspectRatio ratio={1} maxH="250px">
        <Img
          w="full"
          objectFit="cover"
          src={hasImage ? imageUrl : "/recipe-placeholder.png"}
          alt={recipe.title}
        />
      </AspectRatio>
      <Flex
        alignItems="flex-end"
        w="full"
        h="full"
        bgGradient="linear(transparent 40%, black 100%)"
        position="absolute"
        zIndex="overlay"
        bottom="0"
        padding="2"
        color="white"
      >
        <Text fontSize="sm">{recipe.title}</Text>
      </Flex>
    </Link>
  );
}

export default Recipe;
