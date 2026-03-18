import React from 'react';
import Video from '../../assets/images/Sequence.mp4';

const VideoPlayer = () => {
  return (
    <div className="container-fluid p-0">
      <video
        className="w-100"
        src={Video}
        autoPlay
        muted
        loop
        playsInline
        style={{  height: '75vh',
    width: '100%',
    objectFit: 'cover' }}
      />
    </div>
  );
};

export default VideoPlayer;
