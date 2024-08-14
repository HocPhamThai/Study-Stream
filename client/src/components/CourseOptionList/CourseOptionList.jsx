import React from 'react'

function CourseOptionList({ course, onClick }) {
  return (
    <>
      <div
        className='group relative col-span-1 cursor-pointer overflow-hidden rounded-lg bg-cl-bg-icon shadow-sm'
        onClick={onClick}
        style={{ backgroundColor: 'rgba(225,203,172,0.5)' }}
      >
        <div className=''>
          <img
            className='rounded-t-lg'
            src={course.lessonImage}
            alt={course.lessoName}
          />
        </div>
        <div className='line-clamp-2 flex justify-center p-4'>
          <span>{course.lessonName}</span>
        </div>

      </div>
    </>
  )
}

export default CourseOptionList