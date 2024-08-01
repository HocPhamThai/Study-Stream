import { Modal, useMantineTheme } from '@mantine/core'
import Tooltip from '@mui/material/Tooltip'

function ShareModal2({ modalOpened, setModalOpened, rewards, totalDuration }) {
  const theme = useMantineTheme()

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

      <h1 className='font-bold text-lg flex align-center justify-center'>Achievements</h1>
      <div className='grid grid-cols-5 mt-2'>
        {rewards?.map((reward, index) => (
          <div key={index} className='flex justify-center items-center'>
            <Tooltip
              title={reward?.tittle}
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: 'flip',
                    options: {
                      flipVariations: true,
                    },
                  },
                  {
                    name: 'preventOverflow',
                    options: {
                      padding: 8,
                    },
                  },
                ],
              }}
              placement="top"
            >
              <img
                className={`col-span-1 w-[108px] h-[108px] justify-center my-2 ${totalDuration > reward.hour ? '' : 'grayscale'}`}
                src={reward?.link}
                alt={reward?.tittle}
              />
            </Tooltip>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ShareModal2
