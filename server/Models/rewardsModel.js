import mongoose from 'mongoose'

const rewardsSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    hour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const RewardsModel = mongoose.model('Reward', rewardsSchema)

export default RewardsModel
