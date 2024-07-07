import ChatModel from '../Models/chatModel.js'

const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({ members: { $in: [req.params.userId] } })
    res.status(200).json(chat)
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

export { findChat, userChats }
