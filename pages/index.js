import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { recipes } from "../data/recipes";
import BannerAds from "../components/BannerAds";
import RecipesGrid from "../components/RecipesGrid";
import Footer from "../components/Footer";

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
      <RecipesGrid recipes={filtered} />
      <Footer />
    </Box>
  );
}
