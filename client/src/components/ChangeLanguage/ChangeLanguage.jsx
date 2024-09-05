import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const languages = {
  VI: {
    label: 'Vietnamese (vi-VN)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36" className="inline-block mr-2">
        <g fillRule="evenodd" clipRule="evenodd">
          <path fill="#da251d" d="M18 0c9.94 0 18 8.06 18 18s-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0z"></path>
          <path fill="#ffff00" d="m10 15.75 4.944 3.592-1.888 5.812L18 21.563l4.944 3.592-1.89-5.812L26 15.75h-6.132L18 10l-1.868 5.75z"></path>
        </g>
      </svg>
    ),
    lng: 'vi',
  },
  EN: {
    label: 'English (en-US)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" className="inline-block mr-2">
        <circle cx="256" cy="256" r="256" fill="#f0f0f0"></circle>
        <g fill="#d80027">
          <path d="M244.87 256H512c0-23.106-3.08-45.49-8.819-66.783H244.87zM244.87 122.435h229.556a257.35 257.35 0 0 0-59.07-66.783H244.87zM256 512c60.249 0 115.626-20.824 159.356-55.652H96.644C140.374 491.176 195.751 512 256 512zM37.574 389.565h436.852a254.474 254.474 0 0 0 28.755-66.783H8.819a254.474 254.474 0 0 0 28.755 66.783z"></path>
        </g>
        <path fill="#0052b4" d="M118.584 39.978h23.329l-21.7 15.765 8.289 25.509-21.699-15.765-21.699 15.765 7.16-22.037a257.407 257.407 0 0 0-49.652 55.337h7.475l-13.813 10.035a255.58 255.58 0 0 0-6.194 10.938l6.596 20.301-12.306-8.941a253.567 253.567 0 0 0-8.372 19.873l7.267 22.368h26.822l-21.7 15.765 8.289 25.509-21.699-15.765-12.998 9.444A258.468 258.468 0 0 0 0 256h256V0c-50.572 0-97.715 14.67-137.416 39.978zm9.918 190.422-21.699-15.765L85.104 230.4l8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm0-74.574 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822z"></path>
      </svg>
    ),
    lng: 'en',
  },
};

function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'VI'); // Kiểm tra localStorage để lấy ngôn ngữ đã lưu

  useEffect(() => {
    // Khi component mount, đổi ngôn ngữ theo localStorage
    i18n.changeLanguage(languages[currentLanguage].lng);
  }, [currentLanguage, i18n]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    const selectedLanguage = languages[lang].lng;
    i18n.changeLanguage(selectedLanguage);
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang); // Lưu ngôn ngữ đã chọn vào localStorage
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className="flex items-center border border-gray-300 rounded px-3 py-2"
        sx={{
          backgroundColor: 'rgba(128, 128, 128, 0.4)',
          color: 'black',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: 'rgba(128, 128, 128, 0.8)',
            color: 'black',
          },
        }}
      >
        {languages[currentLanguage].icon} <span >{currentLanguage}</span>
        <ExpandMoreIcon className="ml-2" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="flex flex-col p-4 text-left">
          <h3 className="mb-2 font-bold">Languages</h3>
          {Object.keys(languages).map((lang) => (
            <Button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2 rounded-lg p-2 font-medium lowercase text-black hover:bg-gray-100"
              sx={{
                justifyContent: 'flex-start',
                backgroundColor: 'transparent',
                color: 'black',
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor: 'rgba(128, 128, 128, 0.5)',
                  color: 'black',
                },
              }}
            >
              {languages[lang].icon}
              {languages[lang].label.toLowerCase()}
            </Button>
          ))}
        </div>
      </Popover>
    </div>
  );
}

export default ChangeLanguage;
