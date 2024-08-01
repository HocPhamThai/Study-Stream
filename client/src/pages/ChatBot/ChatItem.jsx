import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import aiImage from '../../img/ai.png'
import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useSelector } from 'react-redux'
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
        <img src={aiImage} alt="#" />
      </Avatar>
      <Box sx={{ width: '100%' }}>
        {!messageBlocks && (
          <Typography
            sx={{
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {content}
          </Typography>
        )}
        {messageBlocks?.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                language="javascript"
                style={darcula}
                wrapLongLines={true}
                lineProps={{
                  style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: '16px' }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        p: 2,
        bgcolor: 'var(--cardColor)',
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {user?.firstname + user?.lastname}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: '16px' }}>{content}</Typography>
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
