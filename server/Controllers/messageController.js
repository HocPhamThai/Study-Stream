import MessageModel from '../Models/messageModel.js'

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body

  const newMessage = new MessageModel({
    chatId,
    senderId,
    text,
  })
  try {
    newMessage.save()
    res.status(200).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMessages = async (req, res) => {
  const { chatId } = req.params

  try {
    const messages = await MessageModel.find({ chatId })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { createMessage, getMessages }
