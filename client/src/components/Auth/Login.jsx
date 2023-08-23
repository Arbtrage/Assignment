import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [number,setNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login-user', { number, password });
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);
      window.location.href='/home';
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="number" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
