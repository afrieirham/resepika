import {
  Card,
  CardBody,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function BannerAds() {
  return (
    <Stack mb="6">
      <Card
        as={Link}
        href="https://dub.sh/sambal-nyet"
        isExternal
        maxW="3xl"
        mx="auto"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        _hover={{ textDecoration: "none" }}
      >
        <Image
          objectFit="cover"
          w="full"
          maxW={{ base: "100%", sm: "160px" }}
          maxH={{ base: "160px" }}
          src="./sambal-nyet.jpeg"
          alt="gambar sambal nyet"
        />

        <Stack>
          <CardBody>
            <Heading size="md">
              Buy Sambal Nyet Official By Khairulaming Here
            </Heading>

            <Text py="2">
              This is an affiliate link. We may earn a commission when you make
              a purchase through them. Your support is appreciated.
            </Text>
          </CardBody>
        </Stack>
      </Card>
      <Card
        as={Link}
        href="https://dub.sh/dendeng-nyet"
        isExternal
        maxW="3xl"
        mx="auto"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        _hover={{ textDecoration: "none" }}
      >
        <Image
          objectFit="cover"
          w="full"
          maxW={{ base: "100%", sm: "160px" }}
          maxH={{ base: "160px" }}
          src="./dendeng-nyet.jpeg"
          alt="gambar dendeng nyet"
        />

        <Stack>
          <CardBody>
            <Heading size="md">
              Buy Dendeng Nyet Official By Khairulaming Here
            </Heading>

            <Text py="2">
              This is an affiliate link. We may earn a commission when you make
              a purchase through them. Your support is appreciated.
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </Stack>
  );
}

export default BannerAds;
