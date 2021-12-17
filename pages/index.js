import { Box, Flex, Image, Input, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { client } from '../utils/contentful'

export const getStaticProps = async () => {
  const response = await client.getEntries({ limit: 1000 })

  return {
    props: {
      recipes: response.items,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

export default function Home({ recipes }) {
  const [filtered, setFiltered] = useState(recipes)

  const onSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()

    const filtered = recipes.filter((item) => {
      const currentRecipe = item.fields.title.toLowerCase()
      return currentRecipe.includes(searchTerm)
    })

    setFiltered(filtered)
  }

  return (
    <Box px='4' pt='6' maxW='sm' mx='auto'>
      <Text fontSize='xl' fontWeight='bold' textAlign='center' mb='6'>
        Koleksi Resepi Khairulaming
      </Text>
      <Input placeholder='Cari resepi...' size='lg' bg='white' onChange={onSearch} />
      <Text color='gray.500' fontSize='xs' textAlign='center' mt='2'>
        <Link href='https://linktree.com/afrieirham' isExternal>
          Made with ❤️ by Afrie
        </Link>
      </Text>
      <Flex mt='4' direction='column' w='full'>
        {filtered.map(({ fields }) => {
          const hasImage = Boolean(fields.thumbnail?.fields.file.url)
          return (
            <Flex
              as={Link}
              href={fields.postUrl}
              isExternal
              _hover={{ textDecoration: 'none' }}
              key={fields.slug}
              my='2'
              boxShadow='md'
              borderRadius='md'
              bg='white'
            >
              <Image
                maxW='120px'
                maxH='120px'
                minW='120px'
                minH='120px'
                src={hasImage ? fields.thumbnail.fields.file.url : '/recipe-placeholder.png'}
                borderLeftRadius='md'
                fit='cover'
                boxShadow='md'
              />
              <Flex py='2' px='4' minH='full'>
                <Text fontWeight='semibold' fontSize='md' noOfLines={4}>
                  {fields.title}
                </Text>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
