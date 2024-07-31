import React from 'react'
import './TrendCard.scss'
import { TrendData } from '../../Data/TrendData'
const RewardCard = () => {
  return (
    <div className='block bg-white rounded-xl'>
      <h3 className='ml-10 mt-5'>Achievements</h3>
      <div className="TrendCard flex grid grid-cols-3">
        <img className='col-span-1 w-[108px] h-[108px] grayscale' src="https://storageaccountstudy9794.blob.core.windows.net/badge/9335358c-04b5-4926-abdb-206ec40cf116.svg" alt="" />
        <div className='col-span-2 flex items-center'>Achieved 1 hours streak</div>
      </div>
      <div className="TrendCard flex grid grid-cols-3">
        <img className='col-span-1 w-[108px] h-[108px]' src="https://storageaccountstudy9794.blob.core.windows.net/badge/204ec12a-9c17-4107-bebd-ffdcc034fa4f.svg" alt="" />
        <div className='col-span-2 flex items-center'>Achieved 2 hours streak</div>
      </div>
      <div className="TrendCard flex grid grid-cols-3">
        <img className='col-span-1 w-[108px] h-[108px]' src="https://storageaccountstudy9794.blob.core.windows.net/badge/c5faa4ae-e81a-4d1f-b2d7-5027f229f986.svg" alt="" />
        <div className='col-span-2 flex items-center'>Achieved 3 hours streak</div>
      </div>
      <div className="TrendCard flex grid grid-cols-3">
        <img className='col-span-1 w-[108px] h-[108px]' src="https://storageaccountstudy9794.blob.core.windows.net/badge/f347a28c-647f-4fa2-b9c1-fa5fbf7e5210.svg" alt="" />
        <div className='col-span-2 flex items-center'>Achieved 5 hours streak</div>
      </div>
    </div>
  )
}

export default RewardCard
