import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { createClient } from 'contentful'

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  })

  const response = await client.getEntries()

  return {
    props: {
      items: response.items,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60 * 60 * 1, // In seconds
  }
}

export default function Home({ items }) {
  console.log(items)
  return (
    <Box px='4' pt='6'>
      <Text fontSize='xl' fontWeight='bold' textAlign='center'>
        Recipes
      </Text>
      <Flex direction='column' w='full'>
        {items.map(({ fields }) => (
          <Flex key={fields.slug} my='2' boxShadow='md' borderRadius='md' bg='white'>
            <Image
              maxW='100px'
              maxH='100px'
              minW='100px'
              minH='100px'
              src={fields.thumbnail.fields.file.url}
              borderLeftRadius='md'
              fit='cover'
              boxShadow='md'
            />
            <Flex py='4' px='2' minH='full'>
              <Text fontWeight='semibold' fontSize='md'>
                {fields.title}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
