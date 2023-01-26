import Head from "next/head";
import { Box, Button, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";

import { client } from "../utils/contentful";
import Recipe from "../components/Recipe";

export const getStaticProps = async (context) => {
  const { term } = context.params;
  const cleanTerm = term.replaceAll("-", " ");
  const response = await client.getEntries({
    content_type: "recipe",
    limit: 1000,
    "fields.title[match]": cleanTerm,
  });

  // Sort recipes based on createdAt
  const recipes = response.items.sort((a, b) => {
    const i = new Date(a.sys.createdAt);
    const j = new Date(b.sys.createdAt);
    return j - i;
  });

  return {
    props: {
      recipes,
      term: cleanTerm,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - Every 10 minutes
    revalidate: 60 * 10,
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

  const renderItems = () =>
    recipes?.map(({ fields }) => (
      <Recipe key={fields.postUrl} fields={fields} />
    ));

  return (
    <Box>
      <Head>
        <title>{term} | Koleksi Resepi Khairulaming</title>
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
