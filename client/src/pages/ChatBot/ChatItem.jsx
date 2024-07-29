import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useSelector } from 'react-redux'
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function extractCodeFromString(message) {
  if (message.includes('```')) {
    const blocks = message.split('```')
    return blocks
  }
}

function isCodeBlock(str) {
  return !!(
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  )
}
const ChatItem = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content)
  const user = useSelector((state) => state.authReducer.authData)
  return role == 'assistant' ? (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d5612',
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: '0' }}>
        <img src="../../img/ai.png" alt="#" />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: '20px' }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: '20px' }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d56',
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {user.firstname + user.lastname}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: '20px' }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                // style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: '20px' }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  )
}

export default ChatItem
