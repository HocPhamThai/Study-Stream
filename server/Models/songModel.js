import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    nameSong: {
      type: String,
      required: true,
    },
    linkStored: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SongModel = mongoose.model('Song', songSchema);

export default SongModel;
