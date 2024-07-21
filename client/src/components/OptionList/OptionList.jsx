import React from 'react'

function OptionList({ topic, onClick }) {
  return (
    <>
      <div className='group relative col-span-1 cursor-pointer overflow-hidden rounded-lg bg-cl-bg-icon shadow-sm' onClick={onClick}>
        <div className=''>
          <img
            className='rounded-lg'
            src={topic.coverImage}
            alt={topic.name}
          />
        </div>
        <div className='line-clamp-2 flex justify-center p-4'>
          <span>{topic.name}</span>
        </div>

      </div>
    </>
  )
}

export default OptionList