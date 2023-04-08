import { Flex, Link, Text } from "@chakra-ui/layout";
import React from "react";

function Footer() {
  return (
    <Flex py="4" justifyContent="center" alignItems="center" h="5vh">
      <Text color="gray.500" fontSize="xs" textAlign="center">
        <Link href="https://bento.me/afrieirham" isExternal>
          Made with ❤️ by Afrie
        </Link>
      </Text>
    </Flex>
  );
}

export default Footer;
