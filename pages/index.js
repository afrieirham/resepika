import { Box, Flex, Input, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { recipes } from "../data/recipes";
import Recipe from "../components/Recipe";
import BannerAds from "../components/BannerAds";

export default function Home() {
  const [filtered, setFiltered] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = recipes.filter((item) => {
      const currentRecipe = item.title.toLowerCase();
      return currentRecipe.includes(searchTerm);
    });

    setFiltered(filtered);
  }, [searchTerm]);

  return (
    <Box>
      <Flex
        direction="column"
        my="6"
        mx="auto"
        w="full"
        maxW="sm"
        justifyContent="center"
        alignItems="center"
        px={{ base: "4", md: "none" }}
      >
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="2">
          Koleksi Resepi Khairulaming
        </Text>
        <Input
          value={searchTerm}
          placeholder="Cari resepi..."
          size="lg"
          bg="white"
          onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}
        />
      </Flex>

      <BannerAds />

      <SimpleGrid
        mx="auto"
        spacing={{ base: 1, sm: 2 }}
        columns={{ base: 1, sm: 2, md: 3 }}
        maxWidth="3xl"
      >
        {filtered.map((r) => (
          <Recipe key={r.postUrl} recipe={r} />
        ))}
      </SimpleGrid>

      <Flex py="4" justifyContent="center" alignItems="center" h="5vh">
        <Text color="gray.500" fontSize="xs" textAlign="center">
          <Link href="https://bento.me/afrieirham" isExternal>
            Made with ❤️ by Afrie
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}
