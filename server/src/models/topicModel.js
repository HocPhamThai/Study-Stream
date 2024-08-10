import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
    },
    nameOfTopic: {
      type: String,
      required: true,
    },
    topicImage: {
      type: String,
      required: true,
    },
    topicDescription: {
      type: String,
      required: true,
    },
    entries: [
      {
        entryId: {
          type: String,
          required: true,
          unique: true,
        },
        name: {
          type: String,
          required: true,
        },
        coverImage: {
          type: String,
          required: true,
        },
        background: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const TopicModel = mongoose.model('Topic', topicSchema)

export default TopicModel
