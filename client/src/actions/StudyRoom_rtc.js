// src/components/AgoraSetup.js
import AgoraRTC from 'agora-rtc-sdk-ng'
import { v4 as uuidv4 } from 'uuid'
const APP_ID = "3ebc5eb839944096969709b14fc9ab0c"

let uid = sessionStorage.getItem('uid')
if (!uid) {
  uid = uuidv4()
  sessionStorage.setItem('uid', uid)
}

let token = null
let client
let localTracks = []
let remoteUsers = {}

const joinRoomInit = async (roomId, expandVideoFrame) => {
  client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
  try {
    await client.join(APP_ID, roomId, token, uid)

  } catch (error) {
    if (error.code === 'UID_CONFLICT') {
      uid = uuidv4()
      sessionStorage.setItem('uid', uid)
      await client.join(APP_ID, roomId, token, uid)
    } else {
      console.error('Tham gia phòng thất bại:', error)
      return
    }
  }

  client.on('user-published', (user, mediaType) => handleUserPublished(user, mediaType, expandVideoFrame))
  client.on('user-left', handleUserLeft)
  // kích hoạt micro
  let toggleMic = async (e) => {
    let button = e.currentTarget

    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false)
      button.classList.add('active')
    } else {
      await localTracks[0].setMuted(true)
      button.classList.remove('active')
    }
  }
  // kích hoạt camera
  let toggleCamera = async (e) => {
    let button = e.currentTarget

    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false)
      button.classList.add('active')
    } else {
      await localTracks[1].setMuted(true)
      button.classList.remove('active')
    }
  }
  document.getElementById('camera-btn').addEventListener('click', toggleCamera)
  document.getElementById('mic-btn').addEventListener('click', toggleMic)

  joinStream(expandVideoFrame)
}

const joinStream = async (expandVideoFrame) => {
  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
    //   {}, {
    //   encoderConfig: {
    //     width: { min: 640, ideal: 1920, max: 1920 },
    //     height: { min: 480, ideal: 1080, max: 1080 }
    //   }
    // }
  )

  let player = `
  <div class="video__container" id="user-container-${uid}">
    <div class="video-player" id="user-${uid}"> </div>
  </div>`

  document.getElementById("streams__container").insertAdjacentHTML('beforeend', player)
  document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame)

  localTracks[1].play(`user-${uid}`)
  await client.publish([localTracks[0], localTracks[1]])
}

const handleUserPublished = async (user, mediaType, expandVideoFrame) => {
  remoteUsers[user.uid] = user
  await client.subscribe(user, mediaType)

  let player = document.getElementById(`user-container-${user.uid}`)
  if (player === null) {
    player = `
    <div class="video__container" id="user-container-${user.uid}">
      <div class="video-player" id="user-${user.uid}"> </div>
    </div>`
    document.getElementById('streams__container').insertAdjacentHTML('beforeend', player)
    document.getElementById(`user-container-${user.uid}`).addEventListener('click', expandVideoFrame)
  }

  if (mediaType === 'video') {
    user.videoTrack.play(`user-${user.uid}`)
  }

  if (mediaType === 'audio') {
    user.audioTrack.play()
  }
}

const handleUserLeft = async (user) => {
  delete remoteUsers[user.uid]
  document.getElementById(`user-container-${user.uid}`).remove()
}

// kích hoạt camera




export { joinRoomInit }
