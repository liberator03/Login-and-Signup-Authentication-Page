// src/Signup.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore instance
import './Login.css'; // Reusing the same styles for consistency
import signupIllustration from './assets/signup-illustration.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Show loading
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), {
        name,
        gender,
        contactNo,
        email,
      });
      alert('Signup successful. Verification email sent.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);  // Hide loading
    }
  };

  return (
    <div className="login-container">
      <div className="row login-row">
        <div className="col-md-6 illustration-side">
          <img src={signupIllustration} alt="Signup Illustration" className="img-fluid animated-illustration" />
        </div>
        <div className="col-md-6 form-side">
          <div className="form-container">
            <h2 className="text-center mb-4 app-name">LearnSync</h2> {/* Animated App Name */}
            <h5 className="text-uppercase mb-4">Create an Account</h5>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSignup}>
              <div className="mb-3 input-wrapper">
                <input
                  type="text"
                  className="form-control input-focus"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 input-wrapper">
                <select
                  className="form-control input-focus"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3 input-wrapper">
                <input
                  type="tel"
                  className="form-control input-focus"
                  placeholder="Contact Number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 input-wrapper">
                <input
                  type="email"
                  className="form-control input-focus"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 input-wrapper">
                <input
                  type="password"
                  className="form-control input-focus"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 interactive-btn">
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="text-center mt-3">
              <small>
                Already have an account? <Link to="/login">Sign In</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
