import { v4 as uuidv4 } from 'uuid'
import AgoraRTC from 'agora-rtc-sdk-ng'
import AgoraRTM from 'agora-rtm-sdk'

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
let rtmClient
let channel

const joinRoomInit = async (roomId, expandVideoFrame, username) => {
  rtmClient = await AgoraRTM.createInstance(APP_ID)
  await rtmClient.login({ uid, token })

  await rtmClient.addOrUpdateLocalUserAttributes({ 'name': username })

  channel = await rtmClient.createChannel(roomId)
  await channel.join()

  channel.on('MemberJoined', handleMemberJoined)
  channel.on('MemberLeft', handleMemberLeft)
  channel.on('ChannelMessage', handleChannelMessage)
  getMembers()
  addBotMessageToDom(`Welcome to the room ${username} 👋`)
  // 

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

  document.getElementById('camera-btn').addEventListener('click', toggleCamera)

  joinStream(expandVideoFrame)
}

const joinStream = async (expandVideoFrame) => {
  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

  let player = `
  <div class="video__container" id="user-container-${uid}">
    <div class="video-player" id="user-${uid}"> </div>
  </div>`

  document.getElementById("streams__container").insertAdjacentHTML('beforeend', player)
  document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame)

  localTracks[1].play(`user-${uid}`)
  await client.publish([localTracks[0], localTracks[1]])

  await localTracks[0].close();
  localTracks[0] = null;
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

// Sử dụng RTM Agora
// Xử lý thành viên tham gia room
let handleMemberJoined = async (MemberId) => {
  console.log('A new member has joined the room:', MemberId)
  addMemberToDom(MemberId)
  let members = await channel.getMembers()
  updateMemberTotal(members)
  let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
  addBotMessageToDom(`Welcome to the room ${name}! 👋`)

}

// Thêm thành viên vào DOM
let addMemberToDom = async (MemberId) => {
  let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])

  let membersWrapper = document.getElementById('member__list')
  let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                      <span class="green__icon"></span>
                      <p class="member_name">${name}</p>
                    </div>`

  membersWrapper.insertAdjacentHTML('beforeend', memberItem)
}

// Cập nhật tổng số thành viên
let updateMemberTotal = async (members) => {
  let total = document.getElementById('members__count')
  total.innerText = members.length
}

// Xử lý thành viên rời khỏi room
let handleMemberLeft = async (MemberId) => {
  removeMemberFromDom(MemberId)

  let members = await channel.getMembers()
  updateMemberTotal(members)
}

// Xóa thành viên khỏi DOM
let removeMemberFromDom = async (MemberId) => {
  let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`)
  let name = memberWrapper.getElementsByClassName('member_name')[0].textContent
  addBotMessageToDom(`${name} has left the room.`)

  memberWrapper.remove()
}

// Lấy thành viên
let getMembers = async () => {
  let members = await channel.getMembers()
  updateMemberTotal(members)
  for (let i = 0; members.length > i; i++) {
    addMemberToDom(members[i])
  }
}

// Xử lý kênh  gửi tin nhắn trong room
let handleChannelMessage = async (messageData, MemberId) => {

  let data = JSON.parse(messageData.text)
  console.log('Message', data)

  if (data.type === 'chat') {
    addMessageToDom(data.displayName, data.message)
  }

}

// Gửi tin nhắn
let sendMessage = async (message, username) => {
  channel.sendMessage({ text: JSON.stringify({ 'type': 'chat', 'message': message, 'displayName': username }) })
  addMessageToDom(username, message)
}

// Thêm tin nhắn vào DOM
let addMessageToDom = (name, message) => {
  let messagesWrapper = document.getElementById('messages')

  let newMessage = `<div class="message__wrapper">
                      <div class="message__body">
                          <strong class="message__author">${name}</strong>
                          <p class="message__text">${message}</p>
                      </div>
                  </div>`

  messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

  // Tin nhắn cuối cùng luôn hiển thị khi nhắn
  let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
  if (lastMessage) {
    lastMessage.scrollIntoView()
  }
}

// Thêm bot message vào DOM
let addBotMessageToDom = (botMessage) => {
  let messagesWrapper = document.getElementById('messages')

  let newMessage = `<div class="message__wrapper">
                      <div class="message__body__bot">
                          <strong class="message__author__bot">🤖 StudyRoom Bot</strong>
                          <p class="message__text__bot">${botMessage}</p>
                      </div>
                  </div>`

  messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

  let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
  if (lastMessage) {
    lastMessage.scrollIntoView()
  }
}

// Rời khỏi kênh
let leaveChannel = async () => {
  // await channel.leave()
  if (rtmClient) {
    await rtmClient.logout()
  }
}

window.addEventListener('beforeunload', async () => {
  if (rtmClient) {
    await leaveChannel()
  }
})


export { joinRoomInit, sendMessage }
