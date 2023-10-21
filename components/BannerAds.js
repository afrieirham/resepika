import React from "react";
import { Flex, Image, Heading, Text, Link } from "@chakra-ui/react";

function BannerAds() {
  return (
    <Flex
      as={Link}
      href="https://shope.ee/qIEzuP6t4"
      isExternal
      bg="yellow.50"
      maxW="3xl"
      mx="auto"
      mb="6"
      borderColor="yellow.400"
      borderWidth="1px"
      borderRadius="md"
      _hover={{ textDecoration: "none" }}
    >
      <Image
        src="./sambal-nyet.jpeg"
        alt="gambar sambal nyet"
        objectFit="cover"
        borderLeftRadius="md"
        w="100px"
        h="100px"
      />

      <Flex direction="column" justifyContent="center" p="4">
        <Heading size="sm">
          Buy Sambal Nyet Official By Khairulaming Here
        </Heading>
        <Text fontSize="xs" color="gray.700" mt="2">
          This is an affiliate link.
          <br />
          We may earn a commission when you make a purchase through them. Your
          support is appreciated.
        </Text>
      </Flex>
    </Flex>
  );
}

export default BannerAds;
