import SongModel from '../Models/songModel.js'

// Tạo một bài hát mới
export const createSong = async (req, res) => {
  try {
    const { nameSong, linkStored } = req.body
    const newSong = new SongModel({ nameSong, linkStored })
    await newSong.save()
    res.status(201).json(newSong)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Lấy tất cả bài hát
export const getSongs = async (req, res) => {
  try {
    const songs = await SongModel.find()
    res.status(200).json(songs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy một bài hát bằng ID
export const getSongById = async (req, res) => {
  try {
    const song = await SongModel.findById(req.params.id)
    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }
    res.status(200).json(song)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật bài hát bằng ID
export const updateSong = async (req, res) => {
  try {
    const { nameSong, linkStored } = req.body
    const song = await SongModel.findByIdAndUpdate(
      req.params.id,
      { nameSong, linkStored },
      { new: true, runValidators: true }
    )
    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }
    res.status(200).json(song)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Xóa bài hát bằng ID
export const deleteSong = async (req, res) => {
  try {
    const song = await SongModel.findByIdAndDelete(req.params.id)
    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }
    res.status(200).json({ message: 'Song deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
