import { Box, Flex, Input, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Recipe from "../components/Recipe";

import { client } from "../utils/contentful";

export const getStaticProps = async () => {
  const response = await client.getEntries({ limit: 1000 });

  // Sort recipes based on createdAt
  const recipes = response.items.sort((a, b) => {
    const i = new Date(a.sys.createdAt);
    const j = new Date(b.sys.createdAt);
    return j - i;
  });

  return {
    props: {
      recipes,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - Every 10 minutes
    revalidate: 60 * 10,
  };
};

export default function Home({ recipes }) {
  const [filtered, setFiltered] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = recipes.filter((item) => {
      const currentRecipe = item.fields.title.toLowerCase();
      return currentRecipe.includes(searchTerm);
    });

    setFiltered(filtered);
  }, [searchTerm, recipes]);

  const renderItems = () =>
    filtered.map(({ fields }) => (
      <Recipe key={fields.postUrl} fields={fields} />
    ));

  return (
    <Box>
      <Flex
        direction="column"
        h="15vh"
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

      <SimpleGrid
        mx="auto"
        spacing={{ base: 1, sm: 2 }}
        columns={{ base: 1, sm: 2, md: 3 }}
        maxWidth="3xl"
      >
        {renderItems()}
      </SimpleGrid>

      <Flex py="4" justifyContent="center" alignItems="center" h="5vh">
        <Text color="gray.500" fontSize="xs" textAlign="center">
          <Link href="https://afrieirham.com" isExternal>
            Made with ❤️ by Afrie
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}
