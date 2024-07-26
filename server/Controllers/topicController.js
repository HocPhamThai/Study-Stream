import TopicModel from '../models/topicModel.js';

export const createTopic = async (req, res) => {
  try {
    const { topicName, nameOfTopic, topicImage, topicDescription, entries } = req.body;

    if (!topicName || !nameOfTopic || !topicImage || !topicDescription) {
      return res.status(400).json({ message: "All fields are required: topicName, nameOfTopic, topicImage, topicDescription" });
    }

    const newTopic = new TopicModel({
      topicName,
      nameOfTopic,
      topicImage,
      topicDescription,
      entries: entries || []
    });

    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

// DeleteTopic
export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await TopicModel.findByIdAndDelete(id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

//--- Tạo entries mới

export const createEntry = async (req, res) => {
  try {
    const { topicName } = req.params;
    const { entryId, name, background, coverImage } = req.body; // Thêm coverImage vào đây

    if (!coverImage) {
      return res.status(400).json({ message: "coverImage is required" });
    }

    const topic = await TopicModel.findOne({ topicName: topicName });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const newEntry = { entryId, name, background, coverImage }; // Thêm coverImage vào đây
    topic.entries.push(newEntry);
    await topic.save();

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




export const deleteEntry = async (req, res) => {
  try {
    const { topicName, entryId } = req.params;

    const topic = await TopicModel.findOne({ topicName: topicName });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const initialLength = topic.entries.length;
    topic.entries = topic.entries.filter(entry => entry.entryId !== entryId);

    if (initialLength === topic.entries.length) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await topic.save();

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEntry = async (req, res) => {
  try {
    const { topicName, entryId } = req.params;
    const { name, background, coverImage } = req.body;

    // Tìm kiếm topic bằng topicName
    const topic = await TopicModel.findOne({ topicName: topicName });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Tìm kiếm entry bằng entryId trong danh sách entries của topic
    const entry = topic.entries.find(entry => entry.entryId === entryId);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Cập nhật các thuộc tính nếu chúng được cung cấp trong request body
    if (name !== undefined) {
      entry.name = name;
    }
    if (background !== undefined) {
      entry.background = background;
    }
    if (coverImage !== undefined) {
      entry.coverImage = coverImage;
    }

    // Lưu topic với các thay đổi
    await topic.save();

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Topic:
// Update Topic
export const updateTopic = async (req, res) => {
  try {
    const { topicName } = req.params;
    const { nameOfTopic, topicImage, topicDescription } = req.body;

    const updatedTopic = await TopicModel.findOne({ topicName });
    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    if (nameOfTopic) updatedTopic.nameOfTopic = nameOfTopic;
    if (topicImage) updatedTopic.topicImage = topicImage;
    if (topicDescription) updatedTopic.topicDescription = topicDescription;

    await updatedTopic.save();
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

