const io = require('socket.io')(8800, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let activeUsers = []
io.on('connection', (socket) => {
  // add new user
  socket.on('new-user-add', (newUserId) => {
    // add new user to activeUsers
    if (!activeUsers.some((userId) => userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id })
    }
    console.log('Connected Users: ', activeUsers)
    io.emit('get-users', activeUsers)
  })

  // send-message
  socket.on('send-message', (data) => {
    const { receiveId } = data
    const user = activeUsers.find((user) => user.userId === receiveId)
    console.log('Sending form socket to ', receiveId)
    console.log('Data ', data)
    if (user) {
      io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
    console.log('User disconnected: ', activeUsers)
    io.emit('get-users', activeUsers)
  })
})
