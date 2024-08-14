import mongoose from 'mongoose'

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
    unique: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  lessonImage: {
    type: String,
    required: true,
  },
  lessonLink: {
    type: String,
    required: true,
  },
})

// Course Schema
const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
})

// Course Topic Schema
const courseTopicSchema = new mongoose.Schema({
  courseTopicId: {
    type: String,
    required: true,
  },
  courseTopicName: {
    type: String,
    required: true,
  },
  courseTopicImage: {
    type: String,
    required: true,
  },
  courseTopicDescription: {
    type: String,
    required: true,
  },
  courses: [courseSchema],
}, { timestamps: true })

const CourseTopicModel = mongoose.model('CourseTopic', courseTopicSchema)

export default CourseTopicModel
