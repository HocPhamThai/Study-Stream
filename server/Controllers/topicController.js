import TopicModel from '../models/topicModel.js';

export const createTopic = async (req, res) => {
  try {
    const { topicName, entries } = req.body;

    if (!topicName) {
      return res.status(400).json({ message: "Topic name is required" });
    }

    const newTopic = new TopicModel({
      topicName,
      entries: entries || []
    });

    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller functions
export const getTopics = async (req, res) => {
  try {
    const topics = await TopicModel.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopicByName = async (req, res) => {
  try {
    const { topicName } = req.params;
    const topic = await TopicModel.findOne({ topicName });

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Entry
export const getEntry = async (req, res) => {
  try {
    const { topicName, entryId } = req.params;

    const topic = await TopicModel.findOne({ topicName });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const entry = topic.entries.find(entry => entry.entryId === entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//---

export const createEntry = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { entryId, name, background } = req.body;

    const topic = await TopicModel.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const newEntry = { entryId, name, background };
    topic.entries.push(newEntry);
    await topic.save();

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { topicId, entryId } = req.params;

    const topic = await TopicModel.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    topic.entries = topic.entries.filter(entry => entry.entryId !== entryId);
    await topic.save();

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { topicId, entryId } = req.params;
    const { name, background } = req.body;

    const topic = await TopicModel.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const entry = topic.entries.find(entry => entry.entryId === entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    entry.name = name || entry.name;
    entry.background = background || entry.background;
    await topic.save();

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
