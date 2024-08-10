import express from 'express';
import {
  createTopic,
  getTopics,
  getTopicByName,
  updateTopic,
  deleteTopic,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
  getRandomEntries
} from '../controllers/topicController.js';

const router = express.Router();

// Route để tạo một topic mới
router.post('/topics', createTopic);

// Route để lấy tất cả các topic
router.get('/topics', getTopics);

// Cập nhật Topic:
router.put('/:topicName', updateTopic)

// Xóa Topic:
router.delete('/:id', deleteTopic);

// Route để lấy một topic theo ID
router.get('/api/topics/:topicName', getTopicByName);

//Lấy entry khi có topicName và entryID
router.get('/:topicName/:entryId', getEntry)
// Route để tạo một entry mới trong topic
router.post('/:topicName/entries', createEntry);

// Route để xóa một entry trong topic
router.delete('/:topicName/entries/:entryId', deleteEntry);

// Route để cập nhật một entry trong topic
router.put('/:topicName/entries/:entryId', updateEntry);

// Lấy ngẫu nhiên 4 entry:
router.get('/random-entries', getRandomEntries)

export default router;
