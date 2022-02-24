import React, { useState } from 'react'
import axios from 'axios'
import { Button, Flex, Input, Link, Text, Textarea } from '@chakra-ui/react'

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  const [caption, setCaption] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [postUrl, setPostUrl] = useState('')

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

  const addToContentful = () => {
    alert('TODO: submit to contentful')
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

      <Button mt='8' w='full' onClick={addToContentful}>
        Submit
      </Button>
    </Flex>
  )
}

export default Admin
