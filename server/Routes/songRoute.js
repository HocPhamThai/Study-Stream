import express from 'express'
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} from '../controllers/songController.js'

const router = express.Router()

// Create a new song
router.post('/', createSong)

// Get all songs
router.get('/', getSongs)

// Get a song by ID
router.get('/:id', getSongById)

// Update a song by ID
router.put('/:id', updateSong)

// Delete a song by ID
router.delete('/:id', deleteSong)

export default router
