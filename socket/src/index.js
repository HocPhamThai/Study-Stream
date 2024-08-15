import { Server } from 'socket.io'
import { createServer } from 'http'

const port = process.env.SOCKET_PORT || 8800

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

let activeUsers = []
io.on('connection', (socket) => {
  socket.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id })
    }
    console.log('Connected Users: ', activeUsers)
    io.emit('get-users', activeUsers)
  })

  socket.on('send-message', (data) => {
    const { receiveId } = data
    const user = activeUsers.find((user) => user.userId === receiveId)
    console.log('Sending from socket to ', receiveId)
    console.log('Data ', data)
    if (user) {
      io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('create-chat', (chatData) => {
    const { senderId, receiverId, chat } = chatData
    const sender = activeUsers.find((user) => user.userId === senderId)
    const receiver = activeUsers.find((user) => user.userId === receiverId)

    if (sender) {
      io.to(sender.socketId).emit('chat-created', chat)
    }
    if (receiver) {
      io.to(receiver.socketId).emit('chat-created', chat)
    }
  })

  socket.on('delete-chat', (chatData) => {
    console.log(chatData)
    const { members, _id: chatId } = chatData.chatData
    console.log(members, chatId)
    const sender = activeUsers.find((user) => user.userId === members[0])
    const receiver = activeUsers.find((user) => user.userId === members[1])

    if (sender) {
      io.to(sender.socketId).emit('chat-deleted', chatId)
    }
    if (receiver) {
      io.to(receiver.socketId).emit('chat-deleted', chatId)
    }
  })

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
    console.log('User disconnected: ', activeUsers)
    io.emit('get-users', activeUsers)
  })
})

httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`)
})
