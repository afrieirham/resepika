import React from 'react'
import { Flex, Image, Link, Text } from '@chakra-ui/react'

function Recipe({ fields }) {
  const hasImage = Boolean(fields.thumbnail?.fields.file.url)
  return (
    <Flex
      as={Link}
      href={fields.postUrl}
      isExternal
      _hover={{ textDecoration: 'none' }}
      boxShadow='md'
      borderRadius='md'
      bg='white'
      w='full'
      mx='auto'
      my={{ base: '2', md: '0' }}
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
}

export default Recipe

