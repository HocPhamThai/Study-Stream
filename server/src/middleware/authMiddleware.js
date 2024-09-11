import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_KEY

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    console.log(req.headers)
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Token missing' })
    }

    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }
    res.status(401).json({ message: 'Auth failed' })
  }
}

export default authMiddleware
