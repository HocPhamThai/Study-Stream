import React from 'react';

const IframeComponent = () => {
  return (
    <div className="relative mr-2">
      <h1>Embedded Content</h1>
      <iframe
        className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        src="https://www.youtube.com/embed/AuhfSWFOziU?autoplay=1&loop=1&playlist=AuhfSWFOziU&amp;mute=1&amp;controls=0&amp;start=286&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
        title="Example Iframe"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ width: '105vw', height: '120%' }}
      ></iframe>
    </div>
  );
};

export default IframeComponent;
