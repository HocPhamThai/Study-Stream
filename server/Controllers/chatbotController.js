import Groq from 'groq-sdk'
import UserModel from '../Models/userModel.js'

export const generateChatCompletion = async (req, res, next) => {
  const { message, id } = req.body
  try {
    const user = await UserModel.findById(id)
    if (!user)
      return res.status(401).json({
        message: 'User not registered or token malfunctioned!!!',
      })
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }))
    chats.push({ role: 'user', content: message })
    user.chats.push({ role: 'user', content: message })

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const chatResponse = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama3-8b-8192',
    })
    user.chats.push(chatResponse.choices[0].message)
    await user.save()
    return res.status(200).json({ chats: user.chats })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Server error', cause: error.message })
  }
}

export const sendChatsToUser = async (req, res, next) => {
  const { id } = req.body
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned')
    }
    return res.status(200).json({ message: 'OK', chats: user.chats })
  } catch (error) {
    console.log(error)
    return res.status(200).json({ message: 'ERROR', cause: error.message })
  }
}

export const deleteChats = async (req, res, next) => {
  const { id } = req.body
  try {
    //user token check
    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned')
    }
    user.chats = []
    await user.save()
    return res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.log(error)
    return res.status(200).json({ message: 'ERROR', cause: error.message })
  }
}
