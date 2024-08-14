import CourseTopicModel from '../models/courseTopicModel.js'

// Tạo mới một courseTopic
export const createCourseTopic = async (req, res) => {
  try {
    const { courseTopicId, courseTopicName, courseTopicImage, courseTopicDescription, courses } = req.body

    if (!courseTopicId || !courseTopicName || !courseTopicImage || !courseTopicDescription) {
      return res.status(400).json({
        message: 'All fields are required: courseTopicId, courseTopicName, courseTopicImage, courseTopicDescription',
      })
    }

    const newCourseTopic = new CourseTopicModel({
      courseTopicId,
      courseTopicName,
      courseTopicImage,
      courseTopicDescription,
      courses: courses || [],
    })

    const savedCourseTopic = await newCourseTopic.save()
    res.status(201).json(savedCourseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tất cả các courseTopic
export const getCourseTopics = async (req, res) => {
  try {
    const courseTopics = await CourseTopicModel.find()
    res.status(200).json(courseTopics)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy courseTopic theo courseTopicId
export const getCourseTopicById = async (req, res) => {
  try {
    const { courseTopicId } = req.params
    const courseTopic = await CourseTopicModel.findOne({ courseTopicId })

    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    res.status(200).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật một courseTopic theo courseTopicId
export const updateCourseTopic = async (req, res) => {
  try {
    const { id } = req.params
    const { courseTopicName, courseTopicImage, courseTopicDescription } = req.body

    const updatedCourseTopic = await CourseTopicModel.findById(id)
    if (!updatedCourseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    if (courseTopicName) updatedCourseTopic.courseTopicName = courseTopicName
    if (courseTopicImage) updatedCourseTopic.courseTopicImage = courseTopicImage
    if (courseTopicDescription) updatedCourseTopic.courseTopicDescription = courseTopicDescription

    await updatedCourseTopic.save()
    res.status(200).json(updatedCourseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa một courseTopic theo courseTopicId
export const deleteCourseTopic = async (req, res) => {
  try {
    const { id } = req.params
    const courseTopic = await CourseTopicModel.findByIdAndDelete(id)

    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    res.status(200).json({ message: 'Course Topic deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tất cả courses trong một courseTopic
export const getCoursesByTopic = async (req, res) => {
  try {
    const { courseTopicId } = req.params
    const courseTopic = await CourseTopicModel.findOne({ courseTopicId }).select('courses')

    if (!courseTopic) {
      return res.status(404).json({ message: 'CourseTopic not found' })
    }

    res.status(200).json(courseTopic.courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy course theo courseId trong một courseTopic
export const getCourseById = async (req, res) => {
  try {
    const { courseTopicId, courseId } = req.params
    const courseTopic = await CourseTopicModel.findOne({ courseTopicId })
    if (!courseTopic) {
      return res.status(404).json({ message: 'CourseTopic not found' })
    }

    const course = courseTopic.courses.find(course => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Thêm course mới vào courseTopic bằng courseTopicId
export const createCourse = async (req, res) => {
  try {
    const { id } = req.params
    const courses = req.body

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ message: 'Courses array is required' })
    }

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    courses.forEach((course) => {
      const { courseId, courseName, courseImage, courseDescription, lessons } = course

      if (!courseImage || !courseDescription) {
        return res.status(400).json({ message: 'courseImage and courseDescription are required for all courses' })
      }

      courseTopic.courses.push({ courseId, courseName, courseImage, courseDescription, lessons: lessons || [] })
    })

    await courseTopic.save()

    res.status(201).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật một course trong một courseTopic bằng courseTopicId và courseId
export const updateCourse = async (req, res) => {
  try {
    const { id, courseId } = req.params
    const { courseName, courseImage, courseDescription } = req.body

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    const course = courseTopic.courses.find((course) => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (courseName !== undefined) course.courseName = courseName
    if (courseImage !== undefined) course.courseImage = courseImage
    if (courseDescription !== undefined) course.courseDescription = courseDescription

    await courseTopic.save()

    res.status(200).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa một course trong một courseTopic bằng courseTopicId và courseId
export const deleteCourse = async (req, res) => {
  try {
    const { id, courseId } = req.params

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    const initialLength = courseTopic.courses.length
    courseTopic.courses = courseTopic.courses.filter((course) => course.courseId !== courseId)

    if (initialLength === courseTopic.courses.length) {
      return res.status(404).json({ message: 'Course not found' })
    }

    await courseTopic.save()

    res.status(200).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tất cả lessons trong một course
export const getLessonsByCourse = async (req, res) => {
  try {
    const { courseTopicId, courseId } = req.params
    const courseTopic = await CourseTopicModel.findOne({ courseTopicId })

    if (!courseTopic) {
      return res.status(404).json({ message: 'CourseTopic not found' })
    }

    const course = courseTopic.courses.find(course => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.status(200).json(course.lessons)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy lesson theo lessonId trong một course
export const getLessonById = async (req, res) => {
  try {
    const { courseTopicId, courseId, lessonId } = req.params
    const courseTopic = await CourseTopicModel.findOne({ courseTopicId })

    if (!courseTopic) {
      return res.status(404).json({ message: 'CourseTopic not found' })
    }

    const course = courseTopic.courses.find(course => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    const lesson = course.lessons.find(lesson => lesson.lessonId === lessonId)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    res.status(200).json(lesson)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Thêm bài học mới trong một course bằng courseTopicId và courseId
export const createLesson = async (req, res) => {
  try {
    const { id, courseId } = req.params
    const lessons = req.body

    if (!Array.isArray(lessons) || lessons.length === 0) {
      return res.status(400).json({ message: 'Lessons array is required' })
    }

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    const course = courseTopic.courses.find((course) => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    lessons.forEach((lesson) => {
      const { lessonId, lessonName, lessonImage, lessonLink } = lesson

      if (!lessonImage || !lessonLink) {
        return res.status(400).json({ message: 'lessonImage and lessonLink are required for all lessons' })
      }

      course.lessons.push({ lessonId, lessonName, lessonImage, lessonLink })
    })

    await courseTopic.save()

    res.status(201).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật một bài học trong một course bằng courseTopicId, courseId và lessonId
export const updateLesson = async (req, res) => {
  try {
    const { id, courseId, lessonId } = req.params
    const { lessonName, lessonImage, lessonLink } = req.body

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    const course = courseTopic.courses.find((course) => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    const lesson = course.lessons.find((lesson) => lesson.lessonId === lessonId)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    if (lessonName !== undefined) lesson.lessonName = lessonName
    if (lessonImage !== undefined) lesson.lessonImage = lessonImage
    if (lessonLink !== undefined) lesson.lessonLink = lessonLink

    await courseTopic.save()

    res.status(200).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa một bài học trong một course bằng courseTopicId, courseId và lessonId
export const deleteLesson = async (req, res) => {
  try {
    const { id, courseId, lessonId } = req.params

    const courseTopic = await CourseTopicModel.findById(id)
    if (!courseTopic) {
      return res.status(404).json({ message: 'Course Topic not found' })
    }

    const course = courseTopic.courses.find((course) => course.courseId === courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    const initialLength = course.lessons.length
    course.lessons = course.lessons.filter((lesson) => lesson.lessonId !== lessonId)

    if (initialLength === course.lessons.length) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    await courseTopic.save()

    res.status(200).json(courseTopic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
