import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import music1 from "../../music/music_1.mp3";
import Modal from 'react-modal';

import './MusicPlayer.scss'

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const tracks = [
    {
      name: 'On the hill',
      src: music1
    },
    {
      name: 'Song 2',
      src: 'https://firebasestorage.googleapis.com/v0/b/ngontumathuat-d946a.appspot.com/o/mood-audio%2FThe%20Name%20of%20Life.mp3?alt=media&token=0bb73f69-92b7-4bca-9002-3bc4c818429d'
    },
    {
      name: 'Song 3',
      src: music1
    },
    {
      name: 'Song 4',
      src: music1
    },
    {
      name: 'Song 5 Song 5 Song 5 Song 5',
      src: 'path_to_song_5.mp3'
    },
    {
      name: 'Song 6',
      src: 'path_to_song_6.mp3'
    },
    {
      name: 'Song 7',
      src: 'path_to_song_7.mp3'
    }
  ];

  const handleClickPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleClickNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTrackSelection = (index) => {
    setCurrentTrack(index);
    closeModal();
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleEnded = () => {
    if (isRepeat) {
      return;
    }
    handleClickNext();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent text-black ">
      <div className="w-full max-w-md audio-player-container">
        <AudioPlayer
          className=' custom-audio-player'
          src={tracks[currentTrack].src}
          onPlay={(e) => console.log('onPlay')}
          showSkipControls={true}
          showJumpControls={false}
          header={`${tracks[currentTrack].name}`}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          onEnded={handleEnded}
          loop={isRepeat}
        // customAdditionalControls={[
        //   <button
        //     key="repeat-button"
        //     onClick={toggleRepeat}
        //     className={`custom-repeat-button ${isRepeat ? 'text-red-500' : 'text-gray-500'}`}
        //   >
        //     <TbRepeat className={`text-xl ${isRepeat ? 'text-red-500' : 'text-gray-500'}`} />
        //   </button>,
        //   <button onClick={openModal} className="px-4 py-2 text-red-500 rounded-lg flex items-center">
        //     <FaMusic className="mr-2" />
        //   </button>
        // ]}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select a Song"
        className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-4"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl mb-4">Select a Song</h2>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}> {/* Giới hạn chiều cao và scroll */}
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => handleTrackSelection(index)}
              className={`block w-full px-4 py-2 mb-2 text-left rounded-lg ${index === currentTrack ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {track.name}
            </button>
          ))}
        </div>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MusicPlayer;
