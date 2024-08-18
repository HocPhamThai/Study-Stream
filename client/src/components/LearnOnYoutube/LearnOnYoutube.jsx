import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearnOnYoutube = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  };

  const handleSubmit = () => {
    const videoId = getId(inputValue);
    if (videoId !== 'error') {
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      console.log('Embed Link:', embedLink); // Kiểm tra link embed
      navigate('/study_pagewith_youtube', { state: { embedLink } }); // Truyền dữ liệu và điều hướng
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <div className="learn-on-youtube-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter YouTube URL"
        className="input-field"
      />
      <button onClick={handleSubmit} className="submit-button">
        Convert & Study
      </button>
    </div>
  );
};

export default LearnOnYoutube;
