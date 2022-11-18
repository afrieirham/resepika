import React from "react";
import { AspectRatio, Flex, Img, Link, Text } from "@chakra-ui/react";

function Recipe({ fields }) {
  const hasImage = Boolean(fields.thumbnail?.fields.file.url);
  const imageUrl = fields.thumbnail?.fields.file.url;

  return (
    <Link href={fields.postUrl} isExternal position="relative">
      <AspectRatio ratio={1} maxWidth={"250px"}>
        <Img
          w="full"
          objectFit="cover"
          src={hasImage ? imageUrl : "/recipe-placeholder.png"}
          alt={fields.title}
        />
      </AspectRatio>
      <Flex
        alignItems="flex-end"
        w="full"
        h="full"
        bgGradient="linear(transparent 50%, black 100%)"
        position="absolute"
        zIndex="overlay"
        bottom="0"
        padding="2"
        color="white"
      >
        <Text fontSize="sm">{fields.title}</Text>
      </Flex>
    </Link>
  );
}

export default Recipe;
