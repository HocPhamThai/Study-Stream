import mongoose from 'mongoose';

const dailyRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const totalSchema = new mongoose.Schema({
  weekStart: Date,
  month: Number,
  year: Number,
  duration: Number,
});

const totalWorkingTimeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  dailyRecords: [dailyRecordSchema],
  weeklyTotals: [totalSchema],
  monthlyTotals: [totalSchema],
  yearlyTotals: [totalSchema],
  totalDuration: {
    type: Number,
    default: 0,
  },
});

const TotalWorkingTime = mongoose.model('TotalWorkingTime', totalWorkingTimeSchema);

export default TotalWorkingTime;
