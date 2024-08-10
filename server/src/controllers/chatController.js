import ChatModel from '../models/chatModel.js'
import MessageModel from '../models/messageModel.js'

const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({ members: { $in: [req.params.userId] } })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body

  try {
    // Check if the chat already exists
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] },
    })

    if (existingChat) {
      return res.status(200).json({ chat: existingChat })
    }

    // Create a new chat
    const newChat = new ChatModel({
      members: [senderId, receiverId],
    })

    const savedChat = await newChat.save()
    res.status(200).json(savedChat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteChat = async (req, res) => {
  try {
    await ChatModel.deleteOne({ _id: req.params.chatId })
    await MessageModel.deleteMany({ chatId: req.params.chatId })
    res.status(200).json({ message: 'Chat deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { findChat, userChats, createChat, deleteChat }
