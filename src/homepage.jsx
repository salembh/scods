import React, { useState } from 'react';
import logo from './images/moon.ico';
import example from './images/right.png';
import examplephone from './images/see.png';
import arrow from './images/arrow.png';
import './home.css';

function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const openRegister = () => {
    closeLoginModal(); // Close the login modal if it's open
    openRegisterModal(); // Open the register modal
  };

  return (
    <>
      <nav className='navbar'></nav>
      

      <a
        href="https://discord.gg/7Sj9FZmsGb"
        className="register"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault(); // Prevents the default anchor behavior
          window.open("https://discord.gg/7Sj9FZmsGb", "_blank");
        }}
      >Discord</a>

      
  
      
  
      <h1 className='header'>Scods.xyz, linking you to the world, one click at a time!</h1>
      <p className='p1'>Say goodbye to scattered social media links and hello to streamlined accessibility. Our platform empowers you to centralize your online presence effortlessly.</p>
      
      
      <a
        href="#"
        className="learnmore"
        onClick={(e) => {
          e.preventDefault(); // Prevents the default anchor behavior
          window.location.href = "/a";
        }}
      >Owner</a>

      
  
      
      <a href='/'>
        <img src={logo} alt="" className='logo'/>
      </a>
  
      <a href='/'>
        <h1 className='logo-text'>Scods.xyz</h1>
      </a>
      
          
      <img src={example} alt='' className='example' />
      <img src={examplephone} alt='' className='example1' />
          
      <img src={arrow} alt='' className='arrow' />
     
    </>
  );
}

export default Home;
