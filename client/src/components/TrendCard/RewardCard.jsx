import React from 'react'
import './TrendCard.scss'
import { TrendData } from '../../Data/TrendData'
const RewardCard = ({ rewards, totalDuration }) => {
  return (
    <div className='block bg-white rounded-xl'>
      <h3 className='ml-10 mt-5'>Achievements</h3>
      {rewards?.map((reward, index) => {
        if (reward.hour < 6) {
          return (
            <div className="TrendCard flex grid grid-cols-3">
              <img
                className={`col-span-1 w-[108px] h-[108px] justify-center my-2 ${totalDuration > reward.hour ? '' : 'grayscale'}`}
                src={reward.link}
                alt=""
              />
              <div className='col-span-2 flex items-center'>{reward.tittle}</div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default RewardCard
