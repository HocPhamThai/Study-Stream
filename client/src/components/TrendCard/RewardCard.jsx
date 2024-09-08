import React from 'react'
import './TrendCard.scss'
import { useTranslation } from 'react-i18next'

const RewardCard = ({ rewards, totalDuration }) => {
  const { t } = useTranslation(['profile'])

  return (
    <div className='block bg-white rounded-xl'>
      <h3 className='ml-10 mt-5 font-bold uppercase'>{t('achievements')}</h3>
      {rewards?.map((reward, index) => {
        if (reward.hour < 6) {
          return (
            <div className="TrendCard flex grid grid-cols-3">
              <img
                className={`col-span-1 w-[108px] h-[108px] justify-center my-2 ${totalDuration > reward.hour ? '' : 'grayscale'}`}
                src={reward.link}
                alt=""
              />
              <div className='col-span-2 flex items-center'>{t(`titles.${index}`)}</div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default RewardCard
