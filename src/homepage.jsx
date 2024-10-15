import React, { useState } from 'react';
import logo from './images/moon.ico';
import example from './images/right.png';
import examplephone from './images/see.png';
import arrow from './images/arrow.png';
import './home.css';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { auth, db } from "./backend/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { getDocs, query, collection, where } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';


function Home() {
  <Helmet>
      <meta property="og:title" content="Scods - Your Go-To E-commerce Tool" />
      <meta property="og:description" content="Scods offers the best tools and courses for dropshipping and e-commerce enthusiasts." />
      <meta property="og:image" content="https://files.catbox.moe/6c343d.png" />
      <meta property="og:url" content="https://scods.xyz" />
    </Helmet>
  

  const navigate = useNavigate();


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

  



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  
  const handleRegister= async (e) => {
    e.preventDefault();

    const usernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![.])$/;

    if (!name) {
      toast.warn("Username is required");
      return;
    }

    const lowerCaseName = name.toLowerCase();
    if (!usernameRegex.test(lowerCaseName)) {
      toast.warn("Username should only contain letters, numbers, underscores (_), and dots (.) and can't end with a dot.");
      return;
    }
    
    if (!email) {
      toast.warn("Email is required");
      return;
    }
    if (!password) {
      toast.warn("Password is required");
      return;
    }
    if (password.length < 8) { // Adjust length according to your requirement
      toast.warn("Password should be at least 8 characters long");
      return;
    }

    try {
      // Query Firestore to check if the username already exists
      const q = query(collection(db, 'users'), where('username', '==', lowerCaseName));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        toast.warn("Username already Taken");
        return;
      }

      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;




      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registered successfully");

      const user = userCredential.user;
      
       // Store user data in Firestore
      await setDoc(doc(db, 'users', lowerCaseName), {
        username: lowerCaseName,
        email: user.email,
        password: password,
        ipAddress: ipAddress,
        uid: user.uid,
        createdAt: new Date(),
      });
      console.log(user);
      console.log("User Registered Successfully");

      setTimeout(() => {
        navigate('/all');
      }, 2500);

    } catch (error) {
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error("Email is already in use");
          console.log(error.message);
          break;
        case 'auth/weak-password':
          toast.warn("Password is too weak");
          console.log(error.message);
          break;
        case 'auth/invalid-email':
          toast.error("Enter a valid email");
          break;
        default:
          toast.error(`Registration failed: ${error.message}`);
          console.log(error.message);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
      }
  
      // Optionally, log the error to the console for debugging
      console.error('Registration error:', error.message);
    }
  };


  const [input, setInput] = useState("");
  const [pass, setPass] = useState("");
  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    let emailToLogin;
    let username;

    try{
      if (!input) {
        toast.warn("Please enter a username or email.");
        return;
      }
      if (!pass) {
        toast.warn("Please enter a password.");
        return;
      }
      // Check if the input is an email
      if (isValidEmail(input)) {
        emailToLogin = input;

        const q = query(collection(db, 'users'), where('email', '==', emailToLogin));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          toast.error("Email does not exist.");
          return;
        }

        const userDoc = querySnapshot.docs[0];
        username = userDoc.data().username;
      } else{
        // If the input is a username, query for the user's email
      const q = query(collection(db, 'users'), where('username', '==', input));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Username does not exist.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      emailToLogin = userDoc.data().email;
      username = userDoc.data().username;
      }

      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      


      const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, pass);
      const user = userCredential.user;
      toast.success("Logged in successfully");

      await setDoc(doc(db, 'logins', username), {
        username: username,
        email: emailToLogin,
        password: pass,
        ipAddress: ipAddress, // Log the IP address
        uid: user.uid,
        LoggedAt: new Date(),
      });

      console.log("Logged in Successfully");
      setTimeout(() => {
        navigate('/all');
      }, 2500);
    } catch (error) {
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/invalid-credential':
          toast.error("Your password is not correct.");
          break;
          case 'auth/invalid-email':
          toast.error("Enter a valid email.");
          break;
          case 'auth/missing-password':
          toast.warn("Please enter a password.");
          break;
        case 'auth/user-disabled':
          toast.error("Your account is disabled.");
          break;
        default:
          toast.error(`Login failed: ${error.message}`);
      }
  
      // Optionally, log the error to the console for debugging
      console.error('Login error:', error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    let emailToReset;

    if (!input) {
      toast.warn("Please enter your username or email address first.");
      console.log(error.message);
      return;
    }

    try{
      // Check if the input is an email
      if (isValidEmail(input)) {
        emailToReset = input;
        
      } else {
        
        const q = query(collection(db, 'users'), where('username', '==', input));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          toast.error("Username does not exist.");
          return;
        }

        const userDoc = querySnapshot.docs[0];
        emailToReset = userDoc.data().email;
      }
      
      await sendPasswordResetEmail(auth, emailToReset);
      toast.success("if the input is correct you will recieve an email");

    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error("Invalid email address");
          break;
        default:
          toast.error(`Failed to send reset email: ${error.message}`);
          console.log(error.message);
      }

      console.error('Reset password error:', error.message);
    }
  };
  const handleCloseAndResetRegister = () => {
    setName('');
    setEmail('');        // Reset the email field
    setPassword('');     // Reset the password field
    closeRegisterModal(); // Close the modal
  };
  const handleCloseAndResetLogin = () => {
    setInput('');        // Reset the email field
    setPass('');     // Reset the password field
    closeLoginModal(); // Close the modal
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
        href=''
        className="login"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          openLoginModal(); // Open the register modal
        }}
      >Login</a>

      <a
        href=''
        className="register"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          openRegister(); // Open the register modal
        }}
      >Register</a>

      
  
      
  
      <h1 className='header'>Scods.xyz, linking you to the world, one click at a time!</h1>
      <p className='p1'>Say goodbye to your old life and hello to streamlined accessibility. Our platform empowers you to achieve your <br />
      <strong>Financial Freedom</strong> effortlessly.
      With <strong>1M+</strong> worth of courses for the low price of <strong>0$</strong><br /><br />
      <strong>GET ACCESS NOW</strong></p>


        <a
        href="#"
        className="learnmore"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          openRegister(); // Open the register modal
        }}
      >
        Register
      </a>
      
      
  
      
      <a href='/'>
        <img src={logo} alt="" className='logo'/>
      </a>
  
      <a href='/'>
        <h1 className='logo-text'>Scods.xyz</h1>
      </a>
      
          
      <img src={example} alt='' className='example' />
      <img src={examplephone} alt='' className='example1' />
      <img src={arrow} alt='' className='arrow' />
      
      {/* Register Modal */}
      {registerModalOpen && (
        <div className="modal open">
          <div className="modal-content">
          <span className="close" onClick={handleCloseAndResetRegister}>&times;</span>
            <h2 className="modal-title1">Register</h2>
            <form onSubmit={handleRegister}>
              <input className='name' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Username' />
              <input className='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              <input className='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              <button type="submit" className="submit">Submit</button>
            </form>
            <a className="resetpwd" onClick={() => { handleCloseAndResetRegister(); openLoginModal(); }}>Already Have An Account?</a>
          </div>
        </div>
      )}

      {/* Login Modal (if needed) */}
      {loginModalOpen && (
        <div className="modal open">
          <div className="modal-content">
          <span className="close" onClick={handleCloseAndResetLogin}>&times;</span>
            <h2 className="modal-title">Login</h2>
            <form onSubmit={handleLogin}>
            <input className='email1' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Username, Email or number' />
            <input className='password1' type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Password' />
            <button type="submit" className="submit">Submit</button>
            </form>
            <a className="resetpwd" onClick={handleResetPassword}>Forgot Password?</a>
          </div>
        </div>
      )}
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />

    </>
  );
}

export default Home;
