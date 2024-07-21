import express from 'express';
import {
  createTopic,
  getTopics,
  getTopicByName,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry
} from '../controllers/topicController.js';

const router = express.Router();

// Route để tạo một topic mới
router.post('/api/topics', createTopic);

// Route để lấy tất cả các topic
router.get('/api/topics', getTopics);

// Route để lấy một topic theo ID
router.get('/api/topics/:topicName', getTopicByName);

//Lấy entry khi có topicName và entryID
router.get('/:topicName/:entryId', getEntry)
// Route để tạo một entry mới trong topic
router.post('/api/topics/:topicId/entries', createEntry);

// Route để xóa một entry trong topic
router.delete('/api/topics/:topicId/entries/:entryId', deleteEntry);

// Route để cập nhật một entry trong topic
router.put('/api/topics/:topicId/entries/:entryId', updateEntry);

export default router;
