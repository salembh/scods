import React, { useState } from 'react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import './reset.css';
import logo from '../images/moon.ico';
import { useNavigate } from 'react-router-dom';

import { db } from "../backend/firebase";
import { doc, setDoc } from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

  const navigate = useNavigate();

  const [mail, setMail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!mail) {
      toast.warn("Email is required");
      return;}

    if (!newPassword) {
      toast.warn("Password is required");
      return;}
    if (newPassword !== confirmPassword) {
      toast.warn('Passwords do not match.');
    return;
    }
    if (newPassword.length < 8) { // Adjust length according to your requirement
      toast.warn("Password should be at least 8 characters long");
      return;
    }

    const oobCode = searchParams.get('oobCode'); // Get the oobCode from the URL
    if (!oobCode) {
        toast.error('Invalid or expired link.');
      return;
    }

    try {

      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;


      await confirmPasswordReset(auth, oobCode, newPassword);

      await setDoc(doc(db, 'pwd_reset',mail), {
        email: mail,
        password: newPassword,
        ipAddress: ipAddress, // Log the IP address
        createdAt: new Date(),
      });
      
      toast.success('Password has been successfully reset.');
      setTimeout(() => {
        navigate('/all');
      }, 2500);
    } catch (error) {
        toast.error('Failed to reset password: ' + error.message);
    }
  };

  return (
    <>
    <nav className='navbar'></nav>
    <a
        href=''
        className="discord"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault(); // Prevents the default anchor behavior
          window.open("https://discord.gg/7Sj9FZmsGb", "_blank");
        }}
      >Discord</a>
      
      <a
        href='/'
        className="login"
        target="_self"
        rel="noopener noreferrer"
      >Login</a>

      <a
        href='/'
        className="register"
        target="_self"
        rel="noopener noreferrer"
      >Register</a>

    <div className="reset-container">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleResetPassword}>
      <input
          type='text'
          placeholder="Confirm Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className='pwd'
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='pwd'
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='pwd'
        />
        <button className='resetbutton' type="submit">Reset Password</button>
      </form>
    </div>
    <a href='/'>
        <img src={logo} alt="" className='logo'/>
      </a>
      <a href='/'>
        <h1 className='logo-text'>Scods.xyz</h1>
      </a>
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
      />
    </>
  );
}

export default ResetPassword;
