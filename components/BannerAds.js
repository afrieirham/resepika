import React from "react";
import { Button } from "@chakra-ui/button";
import { Text, VStack } from "@chakra-ui/layout";

function BannerAds() {
  return (
    <VStack
      bg="white"
      w="full"
      maxWidth="3xl"
      mx="auto"
      my="6"
      p="4"
      borderColor="gray.300"
      borderRadius={{ base: "none", md: "md" }}
      justifyContent="center"
    >
      <Text fontSize="xs" color="gray.700">
        Iklan by Afrie Irham
      </Text>
      <Text textAlign="center">
        Cari kerja menggunakan &quot;kabel&quot; dengan 👇
      </Text>

      <Button
        mx="auto"
        as="a"
        w={{ base: "full", sm: "sm" }}
        href="https://carikabel.com"
        target="_blank"
      >
        CariKabel.com
      </Button>
    </VStack>
  );
}

export default BannerAds;
