import { Modal, useMantineTheme } from '@mantine/core'
import PostShare from '../PostShare/PostShare'

function ShareModal2({ modalOpened, setModalOpened }) {
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
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/9335358c-04b5-4926-abdb-206ec40cf116.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/204ec12a-9c17-4107-bebd-ffdcc034fa4f.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/c5faa4ae-e81a-4d1f-b2d7-5027f229f986.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/f347a28c-647f-4fa2-b9c1-fa5fbf7e5210.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/3f0c1529-c1a6-471a-81bf-e2564a3dfee3.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/f30b9134-80dd-497a-a08b-f841d0fdb3a8.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/78620eef-5bf1-48b2-b478-5f218f8ba382.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/a6faf8b1-f7ca-4556-a202-dde9473163ce.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/e1ba2afc-bd05-466c-b505-c2f582dbe0fe.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/5fff2ce3-6c39-4696-a39b-a187ab03c843.svg" alt="" />
        </div>
        <div className='flex justify-center items-center'>
          <img className='col-span-1 w-[108px] h-[108px] justify-center my-2' src="https://storageaccountstudy9794.blob.core.windows.net/badge/3ba79ec4-ec9a-423d-8743-675de7d20f1e.svg" alt="" />
        </div>


      </div>
    </Modal>
  )
}

export default ShareModal2
