import React, { useState, useEffect } from 'react';
import './App.css';
import pfp from '../images/pfp1.jpg';
import view from '../images/viewW.svg';
import insta from '../images/insta1.png';
import tiktok from '../images/tiktok.png';
import spotify from '../images/spotify.png';
import cover from '../images/songico.jpeg';
import stop from '../song/audio.mp3';

function App() {
  const [viewCount, setViewCount] = useState(7242);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = 108;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [cssLabel, setCssLabel] = useState('Copy BTC Address');
  const [cssLabel1, setCssLabel1] = useState('Copy LTC Address');
  const [bio, setBio] = useState('');
  const [entered, setEntered] = useState(false); // State for animation

  // Typewriter effect
  const [bioText, setBioText] = useState("Owner of scods.xyz        ");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        if (index < bioText.length) {
          setBio(prevBio => prevBio + bioText.charAt(index));
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (index >= 0) {
          setBio(prevBio => prevBio.slice(0, index));
          setIndex(prevIndex => prevIndex - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 50);

    return () => clearInterval(timer); // Cleanup the timer
  }, [bioText, index, isTyping]);

  useEffect(() => {
    fetch('/increment-view')
      .then(response => response.json())
      .then(data => setViewCount(data.viewCount))
      .catch(error => console.error('Error:', error));

    // Other side effects...

  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

  useEffect(() => {
    const audioElement = document.getElementById('audio');

    if (!isPlaying && isOverlayClicked) {
      audioPlay();
      setIsPlaying(true);
    }

    const interval = setInterval(() => {
      const elapsedTime = Math.round(audioElement.currentTime);
      setCurrentTime(elapsedTime);

      if (elapsedTime >= maxTime) {
        audioElement.currentTime = 0;
        setCurrentTime(0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isOverlayClicked, maxTime]);

  const handleCopyAddress = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel('Copy BTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  const handleCopyAddress1 = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel1('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel1('Copy LTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  function audioPlay() {
    var audio = document.getElementById('audio');
    audio.volume = 0.3;
    audio.play();
  }

  const handlePlayPause = () => {
    const audioElement = document.getElementById('audio');
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsOverlayClicked(true);
    audioPlay();
    setEntered(true); // Trigger the animation
  };
  //document.getElementById("audio").volume = 0.2;//

  return (
    <div className='app-container'>
      <video autoPlay loop muted className='video-background'>
        <source src='https://cdn.xoa.me/uploads/49b93994-3fde-494f-bc8c-05285a7497c7.mov' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p1 className='click1'>Click For Boobs!!!</p1>
        </div>
      )}
      <div className={`main-container ${entered ? 'entered' : ''}`}>
        <img src={view} className='view' alt="View Icon" />
        <p1 className='num'>{viewCount}</p1>
        <img src={pfp} className='pfp' alt="Profile Picture" />
        <div className='info' >
          <h1 className='name'>Salem</h1>
          <h1 className='bio'>{bio}</h1> {/* Bio with typewriter effect */}
        </div>
        <div className='links'>
          <a href="https://www.instagram.com/salem.bh_/" target="_blank" rel="noopener noreferrer">
            <img src={insta} className='link1' alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@salem.bh_" target="_blank" rel="noopener noreferrer">
            <img src={tiktok} className='link2' alt="GitHub" />
          </a>
          <a href="https://open.spotify.com/playlist/0mJhoFhrQavhQsdZ338ajB?si=538ec910b8ae42d8" target="_blank" rel="noopener noreferrer">
            <img src={spotify} className='link3' alt="Twitter" />
          </a>
        </div>
        <div className='div1'></div>
        <div className='song'>
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${(currentTime / maxTime) * 100}%` }} />
          </div>
          <a href='https://open.spotify.com/track/6xBpb9zNWlRHTslOAe6kXF?si=a238022b61c34deb' target='_blank' rel='noopener noreferrer'>
            <img src={cover} className='songcover' alt='' />
          </a>
          <div className='songinfo'>
            <p1 className='songtitle'>Slide da Treme</p1>
            <p1 className='artist'>By DJ FNK</p1>
            <p1 className='album' href>On Spotify</p1>
          </div>
          <div className='time-label'>
            {formatTime(currentTime)} / {formatTime(maxTime)}
          </div>
          <audio id='audio' src={stop} />
        </div>
        <div className='div2'></div>
        <button
          className='button2'
          onClick={() => handleCopyAddress1('LY2bFac3D2i2o1pGsRHJhDkZLSnpWH3FRD', 'LTC Address')}
          data-label={cssLabel1}
        >
          LTC
        </button>
        <button
          className='button1'
          onClick={() => handleCopyAddress('bc1q0a5a4udwhqep5mtqp3xdhznr58vzcgw5gn9gth', 'BTC Address')}
          data-label={cssLabel}
        >
          BTC
        </button>
      </div>
    </div>
  );
}

export default App;
