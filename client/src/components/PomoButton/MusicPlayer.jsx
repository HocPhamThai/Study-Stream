import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Modal from 'react-modal';
import { TbRepeat } from 'react-icons/tb';
import { FaMusic } from 'react-icons/fa';

import './MusicPlayer.scss'
import { useEffect } from 'react';
import axios from 'axios';

Modal.setAppElement('#root');

const MusicPlayer = () => {
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const audioPlayerRef = useRef(null);


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/songs`)
        setSongs(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchSongs()
  }, [])
  console.log("Song: ", songs)
  console.log("Song 1: ", songs[1])
  console.log("Song link: ", songs[1]?.linkStored)
  console.log('currentSong: ', currentSong)


  const handleClickPrevious = () => {
    setCurrentSong((prev) => (prev - 1 + songs?.length) % songs?.length);
  };

  const handleClickNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs?.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSongSelection = (index) => {
    setCurrentSong(index);
    closeModal();
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleEnded = () => {
    if (isRepeat) {
      const audio = audioPlayerRef.current.audio.current;
      audio.currentTime = 0;
      audio.play();
    } else {
      handleClickNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent text-black audio-player-container">
      <div className="w-full max-w-md">
        {songs && songs[currentSong] && (

          <AudioPlayer
            ref={audioPlayerRef}
            className='custom-audio-player'
            src={songs[currentSong]?.linkStored}
            autoPlay
            onPlay={(e) => console.log('onPlay')}
            showSkipControls={true}
            showJumpControls={false}
            header={`${songs[currentSong]?.nameSong}`}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleEnded}
            loop={isRepeat}
            customAdditionalControls={[
              <button
                key="repeat-button"
                onClick={toggleRepeat}
                className={`custom-repeat-button ${isRepeat ? 'text-[#f95f35]' : 'text-white'}`}
              >
                <TbRepeat className={`text-xl ${isRepeat ? 'text-[#f95f35]' : 'text-white'}`} />
              </button>,
              <button onClick={openModal} className="px-4 py-2 text-[#f95f35] rounded-lg flex items-center">
                <FaMusic className="mr-2" />
              </button>
            ]}
          />
        )}
      </div>


      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select a Song"
        className="modal-content"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        closeTimeoutMS={200}
      >
        <h2 className="text-xl mb-4">Select a Song</h2>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {songs.map((song, index) => (
            <button
              key={index}
              onClick={() => handleSongSelection(index)}
              className={`modal-button ${index === currentSong ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {song?.nameSong}
              {/* console.log("Song name: ", song) */}
            </button>
          ))}
        </div>
        <button onClick={closeModal} className="modal-close-button">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MusicPlayer;
