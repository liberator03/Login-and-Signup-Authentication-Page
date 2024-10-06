// src/Login.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Login.css';  // Custom styles
import loginIllustration from './assets/login-illustration.png'; // Corrected the path to assets

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      setError(''); // Clear any previous error
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <div className="row login-row">
        <div className="col-md-6 illustration-side">
          <img src={loginIllustration} alt="Login Illustration" className="img-fluid" />
        </div>
        <div className="col-md-6 form-side">
          <div className="form-container">
          <h2 className="text-center mb-4 app-name">LearnSync</h2>
            <h5 className="text-uppercase mb-4">Already a Member!</h5>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Sign In</button>
            </form>
            <div className="text-center mt-3">
              <small>
                Don't have an account yet? <Link to="/signup">Create an account</Link>
              </small>
            </div>
            <div className="text-center mt-3">
              <small>
                <a href="#!" onClick={handleForgotPassword} className="text-primary">Forgot Password?</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
