import React, { useState, useRef, useEffect } from 'react';

export default function InstagramReelsSection() {
  const reels = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DQ9QrH4k-Sd/',
      videoThumbnail: '/image/Dream/video1.mp4',
      title: 'Amazing Reel'
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DQ9QrH4k-Sd/',
      videoThumbnail: '/image/Dream/video2.mp4',
      title: 'Creative Content'
    },
    {
      id: 3,
      url: 'https://www.instagram.com/reel/DQ9QrH4k-Sd/',
      videoThumbnail: '/image/Dream/video3.mp4',
      title: 'Trending Now'
    },
    {
      id: 4,
      url: 'https://www.instagram.com/reel/DQ9QrH4k-Sd/',
      videoThumbnail: '/image/Dream/video4.mp4',
      title: 'Must Watch'
    }
  ];

  const [selectedReelIndex, setSelectedReelIndex] = useState(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (selectedReelIndex !== null && containerRef.current) {
      const scrollPosition = selectedReelIndex * window.innerHeight;
      containerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedReelIndex]);

  useEffect(() => {
    if (selectedReelIndex !== null) {
      const handleScroll = () => {
        if (containerRef.current) {
          const scrollTop = containerRef.current.scrollTop;
          const index = Math.round(scrollTop / window.innerHeight);
          if (index !== currentReelIndex && index >= 0 && index < reels.length) {
            setCurrentReelIndex(index);
            videoRefs.current.forEach((video, i) => {
              if (video) {
                if (i === index) {
                  video.play();
                  video.muted = false;
                } else {
                  video.pause();
                }
              }
            });
          }
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }
  }, [selectedReelIndex, currentReelIndex, reels.length]);

  const handleReelClick = (index) => {
    setSelectedReelIndex(index);
    setCurrentReelIndex(index);
  };

  const handleCloseFullscreen = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setSelectedReelIndex(null);
    setCurrentReelIndex(0);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    const video = e.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      {/* Reels Grid Section */}
      {selectedReelIndex === null && (
        <section style={{
          width: '100%',
          minHeight: '100vh',
          background: '#fff',
          padding: '80px 20px',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '1400px',
            width: '100%'
          }}>
            {/* Section Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#fff',
                marginBottom: '15px',
                textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
              }}>
                Instagram Reels
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.9)',
                margin: 0
              }}>
                Click any reel to watch in fullscreen
              </p>
            </div>

            {/* Reels Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              width: '100%'
            }}>
              {reels.map((reel, index) => (
                <div
                  key={reel.id}
                  onClick={() => handleReelClick(index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '9/16',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  {/* Video Background */}
                  <video
                    src={reel.videoThumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Instagram Icon - Top Right */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Play Icon Overlay - Center */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  className="play-icon-hover">
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="#e4405f">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Reel Title - Bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '20px 15px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}>
                    <h5 style={{
                      color: 'white',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      margin: 0,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                    }}>
                      {reel.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Styles */}
          <style>{`
            @media (max-width: 1200px) {
              section > div > div:last-of-type {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            
            @media (max-width: 768px) {
              section > div > div:last-of-type {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 15px !important;
              }
              
              section {
                padding: 60px 15px !important;
              }
              
              section > div > div:first-child h2 {
                font-size: 2rem !important;
              }
              
              section > div > div:first-child p {
                font-size: 1rem !important;
              }
            }
            
            @media (max-width: 480px) {
              section > div > div:last-of-type {
                grid-template-columns: 1fr !important;
              }
            }

            /* Hover effect for play icon */
            div:hover .play-icon-hover {
              opacity: 1 !important;
            }
          `}</style>
        </section>
      )}

      {/* Fullscreen Reel Viewer */}
      {selectedReelIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Close button area - tap outside video */}
          <div
            onClick={handleCloseFullscreen}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1
            }}
          />

          {/* Close X button */}
          <button
            onClick={handleCloseFullscreen}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              color: 'white',
              fontSize: '24px',
              fontWeight: '300'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>

          {/* Scrollable container */}
          <div
            ref={containerRef}
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'scroll',
              scrollSnapType: 'y mandatory',
              scrollBehavior: 'smooth',
              position: 'relative',
              zIndex: 2
            }}
          >
            {reels.map((reel, index) => (
              <div
                key={reel.id}
                style={{
                  width: '100%',
                  height: '100vh',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  backgroundColor: '#000'
                }}
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={reel.videoThumbnail}
                  loop
                  playsInline
                  autoPlay={index === selectedReelIndex}
                  muted={index !== selectedReelIndex}
                  onClick={handleVideoClick}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 3
                  }}
                />

                {/* Reel Info Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '20px',
                    right: '20px',
                    zIndex: 4,
                    pointerEvents: 'none'
                  }}
                >
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: '0 0 10px 0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}>
                    {reel.title}
                  </h3>
                </div>

                {/* Instagram icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '90px',
                    right: '20px',
                    zIndex: 4,
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '12px',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>

                {/* Scroll indicator */}
                {index < reels.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 4,
                      pointerEvents: 'none',
                      animation: 'bounce 2s infinite'
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" opacity="0.7">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
              }
              40% {
                transform: translateX(-50%) translateY(-10px);
              }
              60% {
                transform: translateX(-50%) translateY(-5px);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}