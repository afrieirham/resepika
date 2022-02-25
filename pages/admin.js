import React, { useState } from 'react'
import axios from 'axios'
import { Button, Flex, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import { promiseFormatter } from '../utils/promiseFormatter'

function Admin() {
  const toast = useToast()

  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  const [caption, setCaption] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [postUrl, setPostUrl] = useState('')

  const [loading, setLoading] = useState(false)

  const onLogin = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/verify', { password })
    setLoggedIn(data.status)

    if (data.status) {
      const { data } = await axios.get('/api/fetch')
      setCaption(data.caption)
      setPhotoUrl(data.photoUrl)
      setPostUrl(data.postUrl)
    }
  }

  if (!loggedIn) {
    return (
      <Flex
        direction='column'
        minH='100vh'
        w='100vw'
        maxW='md'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        p='8'
        as='form'
        onSubmit={onLogin}
      >
        <Input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button mt='4' w='full' type='submit'>
          Login
        </Button>
      </Flex>
    )
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
        mt='8'
        w='full'
        onClick={addToContentful}
        isLoading={loading}
        loadingText='Uploading...'
      >
        Submit
      </Button>
    </Flex>
  )
}

export default Admin
