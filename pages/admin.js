import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { promiseFormatter } from '../utils/promiseFormatter'

function Admin() {
  const toast = useToast()

  const [caption, setCaption] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [source, setSource] = useState('')

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  const [position, setPosition] = useState(1)

  useEffect(() => {
    onFetch()
  }, [])

  const onFetch = async () => {
    setFetching(true)

    const reqBody = source ? { ...JSON.parse(source) } : {}

    const { data } = await axios.post(`/api/fetch/${position}`, reqBody)

    if (!data.error) {
      setCaption(data.caption)
      setPhotoUrl(data.photoUrl)
      setPostUrl(data.postUrl)
    }

    setFetching(false)
  }

  const addToContentful = async () => {
    setLoading(true)
    const newRecipe = { title: caption, photoUrl, postUrl }

    const [data, error] = await promiseFormatter(axios.post('/api/upload', newRecipe))

    if (data) {
      toast({
        variant: 'subtle',
        title: data.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }

    if (error) {
      toast({
        variant: 'subtle',
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }

    setLoading(false)
  }

  return (
    <Flex direction='column' minH='100vh' w='100vw' maxW='md' mx='auto' alignItems='center' p='8'>
      <Text mt='8'>Photo URL</Text>
      <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
      <Button variant='ghost' mt='2' size='sm' w='full' onClick={() => window.open(photoUrl)}>
        Visit
      </Button>

      <Text mt='8'>Post URL</Text>
      <Input value={postUrl} onChange={(e) => setPostUrl(e.target.value)} />
      <Button variant='ghost' mt='2' size='sm' w='full' onClick={() => window.open(postUrl)}>
        Visit
      </Button>

      <Text mt='8'>Caption</Text>
      <Textarea resize='vertical' value={caption} onChange={(e) => setCaption(e.target.value)} />

      <Button
        mt='2'
        w='full'
        onClick={addToContentful}
        isLoading={loading}
        loadingText='Uploading...'
      >
        Submit
      </Button>

      <Text mt='8'>Post to fetch</Text>
      <Input
        type='number'
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder='Post position to fetch'
      />
      <Text mt='4'>Source</Text>
      <Textarea resize='vertical' value={source} onChange={(e) => setSource(e.target.value)} />
      <Button mt='2' w='full' onClick={onFetch} isLoading={fetching}>
        Fetch
      </Button>
    </Flex>
  )
}

export default Admin

