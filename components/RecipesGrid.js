import { SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import Recipe from "./Recipe";

function RecipesGrid({ recipes }) {
  return (
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
  );
}

export default RecipesGrid;
