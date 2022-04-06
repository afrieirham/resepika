import { Box, Flex, Grid, Image, Input, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { client } from '../utils/contentful'

export const getStaticProps = async () => {
  const response = await client.getEntries({ limit: 1000 })

  // Sort recipes based on createdAt
  const recipes = response.items.sort((a, b) => {
    const i = new Date(a.sys.createdAt)
    const j = new Date(b.sys.createdAt)
    return j - i
  })

  return {
    props: {
      recipes,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - Every 10 minutes
    revalidate: 60 * 10,
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
    <Box pt='6' px={{ base: '4', md: '6', lg: '8' }} bgColor='#EDF2F7'>
      <Box mx='auto' w='full' maxW='sm'>
        <Text fontSize='xl' fontWeight='bold' textAlign='center' mb='2'>
          Koleksi Resepi Khairulaming
        </Text>
        <Input placeholder='Cari resepi...' size='lg' bg='white' onChange={onSearch} />
      </Box>
      <Grid
        mt='6'
        w='full'
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap='6'
        maxW={{ base: 'sm', md: 'full' }}
        mx={{ base: 'auto', lg: 0 }}
      >
        {filtered.map(({ fields }) => {
          const hasImage = Boolean(fields.thumbnail?.fields.file.url)
          return (
            <Flex
              as={Link}
              href={fields.postUrl}
              isExternal
              _hover={{ textDecoration: 'none' }}
              key={fields.postUrl}
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
      </Grid>
      <Flex py='4' justifyContent='center' alignItems='center'>
        <Text color='gray.500' fontSize='xs' textAlign='center'>
          <Link href='https://afrieirham.com' isExternal>
            Made with ❤️ by Afrie
          </Link>
        </Text>
      </Flex>
    </Box>
  )
}

