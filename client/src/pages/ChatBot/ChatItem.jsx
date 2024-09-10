import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import aiImage from '../../img/ai.png'
import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function extractCodeFromString(message) {
  const blocks = message.split(/(```[\s\S]*?```)/g).filter(Boolean)
  return blocks
}

function isCodeBlock(str) {
  return /^```[\s\S]*```$/.test(str)
}

const ChatItem = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content)
  const user = useSelector((state) => state.authReducer.authData)

  const renderMessageBlock = (block) => {
    if (isCodeBlock(block)) {
      const codeContent = block.replace(/```/g, '')
      return (
        <SyntaxHighlighter
          language="javascript"
          style={darcula}
          wrapLongLines={true}
          lineProps={{
            style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
          }}
        >
          {codeContent}
        </SyntaxHighlighter>
      )
    } else {
      return <ReactMarkdown remarkPlugins={[remarkGfm]}>{block}</ReactMarkdown>
    }
  }

  return role === 'assistant' ? (
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
        <img src={aiImage} alt="AI" />
      </Avatar>
      <Box sx={{ width: '100%' }}>
        {messageBlocks.length === 1 && !isCodeBlock(messageBlocks[0]) ? (
          <Typography
            sx={{
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {content}
          </Typography>
        ) : (
          messageBlocks.map((block, index) => (
            <Box key={index}>{renderMessageBlock(block)}</Box>
          ))
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        p: 2,
        bgcolor: 'white',
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {user?.firstname + user?.lastname}
      </Avatar>
      <Box>
        {messageBlocks.length === 1 && !isCodeBlock(messageBlocks[0]) ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        ) : (
          messageBlocks.map((block, index) => (
            <Box key={index}>{renderMessageBlock(block)}</Box>
          ))
        )}
      </Box>
    </Box>
  )
}

export default ChatItem
