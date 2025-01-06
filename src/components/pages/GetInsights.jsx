import React, { useState, useEffect, useRef } from 'react'
import AdminLayout from './AdminLayout'
import { Box, Container, IconButton, Paper, Stack, TextField, Typography, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useGetInsightMutation } from '../../redux/api/api';

const GetInsights = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages')
    return savedMessages ? JSON.parse(savedMessages) : []
  })
  const [getInsight] = useGetInsightMutation()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const handleSend = async () => {
    const newMessages = [...messages, { text: input, sender: 'user' }]
    setMessages(newMessages)
    localStorage.setItem('messages', JSON.stringify(newMessages))
    
    setInput('')
    setLoading(true)
    await getInsight({ question: input }).then((data) => {
      const botMessage = { text: data?.data?.data, sender: 'bot' }
      const updatedMessages = [...newMessages, botMessage]
      setMessages(updatedMessages)
      localStorage.setItem('messages', JSON.stringify(updatedMessages))
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <AdminLayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Chat GPT Insight
        </Typography>
        <Paper elevation={3} style={{ height: '70vh', overflowY: 'auto', padding: '16px', background: '#262947' }}>
          {messages.map((message, index) => (
            <Box key={index} mb={2} color={message.sender === 'user' ? '#2e8bdc' : '#8493d9'}  width={message.sender === 'user' ? 'fit-content' : '100%'} marginLeft={message.sender === 'user' ? 'auto' : '0'}
            padding={2} borderRadius={2} border={1} borderColor={message.sender === 'user' ? '#465489' : '#8493d9'}
            textAlign={message.sender === 'user' ? 'right' : 'left'}>
              <Typography variant="body1">
                {typeof message.text === 'string' ? message.text : JSON.stringify(message.text)}
              </Typography>
            </Box>
          ))}
          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Paper>
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a1b1ff',
                },
                '&:hover fieldset': {
                  borderColor: '#a1b1ff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a1b1ff',
                },
              },
              '& .MuiInputBase-input': {
                color: '#a1b1ff',
              },
            }}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Container>
    </AdminLayout>
  )
}

export default GetInsights