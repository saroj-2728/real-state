import { useState } from 'react';
import '../../styles/auth.css';
import { useNavigate } from "react-router"

const Auth = () => {

  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({})

  const [registerUser, setRegisterUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  })

  const verifyRegisterForm = () => {
    const errors = {};

    if (!registerUser.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!registerUser.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerUser.email)) {
      errors.email = 'Email is invalid';
    }

    if (!registerUser.password) {
      errors.password = 'Password is required';
    } else if (registerUser.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (registerUser.password !== registerUser.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!registerUser.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const verfiyLoginForm = () => {
    const errors = {};

    if (!loginUser.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginUser.email)) {
      errors.email = 'Email is invalid';
    }

    if (!loginUser.password) {
      errors.password = 'Password is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const handleRegisterChange = (e) => {
    setRegisterUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleLoginChange = (e) => {
    setLoginUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoginErrors({})

    const errors = verfiyLoginForm();
    setLoginErrors(errors || {})

    if (errors) {
      console.log('Validation errors:', errors);
      return;
    }

    console.log("Form is valid:", loginUser);
    navigate('/dashboard')
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setRegisterErrors({})

    const errors = verifyRegisterForm();
    setRegisterErrors(errors || {});

    if (errors) {
      console.log('Validation errors:', errors);
      return;
    }

    console.log('Form is valid:', registerUser);
    navigate('/dashboard')
  };

  return (
    <div className='auth-component'>

      <div className={`container-auth ${isSignUp ? 'active' : ''}`}>

        {/* Sign up */}
        <div
          style={{
            background: "white"
          }}
          className="form-container sign-up">
          <form
            style={{
              background: "white",
              overflowY: 'auto',
            }}
            onSubmit={handleSignUp}
          >
            <h1
              style={{
                marginTop: Object.keys(registerErrors).length > 0 ? '250px' : "0",
              }}
              className='sign-up-title'>Create Account</h1>

            <div className="form-field">
              <input
                value={registerUser.name}
                name='name'
                type="text"
                placeholder="Name"
                onChange={handleRegisterChange}
              />
              {registerErrors.name && <p className="error-message">{registerErrors.name}</p>}
            </div>

            <div className="form-field">
              <input
                value={registerUser.email}
                name='email'
                type="email"
                placeholder="Email"
                onChange={handleRegisterChange}
              />
              {registerErrors.email && <p className="error-message">{registerErrors.email}</p>}
            </div>

            <div className="form-field">
              <div className="password-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={registerUser.password}
                  name='password'
                  onChange={handleRegisterChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? '🔓' : '🔒'}
                </button>
              </div>
              {registerErrors.password && <p className="error-message">{registerErrors.password}</p>}
            </div>

            <div className="form-field">
              <div className="password-container">
                <input
                  value={registerUser.confirmPassword}
                  name='confirmPassword'
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  onChange={handleRegisterChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? '🔓' : '🔒'}
                </button>
              </div>
              {registerErrors.confirmPassword && <p className="error-message">{registerErrors.confirmPassword}</p>}
            </div>

            <div className="form-field">

              <input
                type="tel"
                placeholder="Phone number"
                value={registerUser.phone}
                name='phone'
                onChange={handleRegisterChange}
              />
              {registerErrors.phone && <p className="error-message">{registerErrors.phone}</p>}
            </div>

            <button
              style={{
                marginBottom: Object.keys(registerErrors).length > 0 ? '40px' : '0'
              }}
              type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign in */}
        <div
          style={{
            background: "white"
          }}
          className="form-container sign-in">
          <form
            style={{
              background: "white"
            }}
            onSubmit={handleSignIn}>
            <h1 className='sign-in-title'>Sign In</h1>
            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                value={loginUser.email}
                name='email'
                onChange={handleLoginChange}
              />
              {loginErrors.email && <p className="error-message">{loginErrors.email}</p>}
            </div>

            <div className="form-field">
              <div className="password-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginUser.password}
                  name='password'
                  onChange={handleLoginChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? '🔓' : '🔒'}
                </button>
              </div>
              {loginErrors.password && <p className="error-message">{loginErrors.password}</p>}
            </div>
            <a href="#">Forgot Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggling and Animations */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p
                style={{
                  maxWidth: '300px'
                }}
              >Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleForm}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p
                style={{
                  maxWidth: '300px'
                }}
              >Register with your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;