import Head from "next/head";
import { Box, Button, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";

import { recipes } from "../data/recipes";
import { capitalize } from "../utils/capitalize";
import Recipe from "../components/Recipe";

export const getStaticProps = async (context) => {
  const cleanTerm = context?.params?.term?.replace(/-/g, " ").toLowerCase();

  return {
    props: {
      recipes: recipes.filter((r) => r.title.toLowerCase().includes(cleanTerm)),
      term: cleanTerm,
    },
  };
};

export async function getStaticPaths() {
  const paths = [
    { params: { term: "kicap" } },
    { params: { term: "ikan" } },
    { params: { term: "sambal" } },
    { params: { term: "roti" } },
    { params: { term: "spaghetti" } },
    { params: { term: "burger" } },
    { params: { term: "cheese" } },
    { params: { term: "sup" } },
    { params: { term: "beef" } },
    { params: { term: "lamb" } },
    { params: { term: "cocktail" } },
    { params: { term: "buttermilk" } },
    { params: { term: "gulai" } },
    { params: { term: "mango" } },
    { params: { term: "puasa" } },

    //
    { params: { term: "nasi" } },
    { params: { term: "nasi-ayam" } },
    { params: { term: "nasi-lemak" } },
    { params: { term: "nasi-goreng" } },
    { params: { term: "nasi-tomato" } },

    //
    { params: { term: "ayam" } },
    { params: { term: "ayam-goreng" } },
    { params: { term: "ayam-bakar" } },
    { params: { term: "ayam-masak-bawang" } },
    { params: { term: "ayam-masak-kicap" } },
    { params: { term: "ayam-masak-merah" } },
    { params: { term: "ayam-black-pepper" } },

    //
    { params: { term: "daging" } },
    { params: { term: "kari-daging" } },
    { params: { term: "daging-black-pepper" } },
    { params: { term: "daging-masak-kicap" } },

    //
    { params: { term: "kek" } },
    { params: { term: "kek-batik" } },
    { params: { term: "kek-pisang" } },

    //
    { params: { term: "telur" } },
    { params: { term: "telur-kicap" } },
    { params: { term: "kambing" } },
    { params: { term: "kambing-perap" } },
    { params: { term: "kerabu" } },
    { params: { term: "kerabu-maggi" } },
    { params: { term: "chicken" } },
    { params: { term: "chicken-chop" } },
    { params: { term: "mee" } },
    { params: { term: "mee-kari" } },
    { params: { term: "puding" } },
    { params: { term: "puding-roti" } },
    { params: { term: "kurma" } },
    { params: { term: "kurma-ayam" } },

    //
    { params: { term: "sos-black-pepper" } },
  ];
  return {
    paths,
    fallback: true,
  };
}

export default function Home({ recipes, term }) {
  const hasRecepis = recipes?.length > 0;

  return (
    <Box>
      <Head>
        <title>{capitalize(term)} | Koleksi Resepi Khairulaming</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction="column"
        h="15vh"
        mx="auto"
        w="full"
        justifyContent="center"
        alignItems="center"
        px={{ base: "4", md: "none" }}
        mt="6"
      >
        {hasRecepis ? (
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            textTransform="capitalize"
          >
            Koleksi Resepi Khairulaming – {term}
          </Text>
        ) : (
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Alamak, tak ada la resepi tu...
          </Text>
        )}
        <Button my="4" size="lg" as="a" href="/">
          Cari resepi lain...
        </Button>
      </Flex>

      <SimpleGrid
        mx="auto"
        spacing={{ base: 1, sm: 2 }}
        columns={{ base: 1, sm: 2, md: 3 }}
        maxWidth="3xl"
      >
        {recipes?.map((r) => (
          <Recipe key={r.postUrl} recipe={r} />
        ))}
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
