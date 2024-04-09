import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import hideIcon from './hide.svg';
import showIcon from './show.svg';
import fun1 from './fun1.gif'



const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    

  
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          onLogin(userData.username); // correct this TODO
        } else {
          const errorData = await response.json();
          // setError(errorData.message); // Assuming the error message is provided in the response
        }
      } catch (error) {
        console.error('Error:', error);
        // setError('An unexpected error occurred'); TODO
        // alert(error);
      }
      navigate('/home');
    };
  

    return (
      <div className="h-screen flex items-center justify-center" style={{background: 'linear-gradient(to right, #CCE7E5, #e3ebeb, #FAF0ED)'}}>
      <div className="bg-white shadow-drop-2-tl rounded px-8 pt-8 pb-8 mb-4 w-full md:w-2/3 lg:w-1/3 flex flex-col md:flex-row">
        <div className="w-2/5 flex flex-col  items-start">
          <h1 className="text-custom-green text-3xl text-left">Welcome!</h1>
          <img src={fun1} alt="gif" className="w-full h-full object-cover" />       
        </div>  
        <form className="w-3/5" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black  text-xs leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className='text-black text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black text-xs leading-tight focus:outline-none focus:shadow-outline pr-10"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? hideIcon : showIcon} alt="toggle" className="w-4 h-4" />               
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
            <button className="bg-custom-green hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
            Log In
            </button>
            </div>
            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
          </form>
      </div>
      </div>
    );
  };

  
export default Login;
