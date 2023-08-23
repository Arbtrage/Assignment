import { useState } from "react";
import axios from "axios";

function Register() {
  const [number,setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/add-user", {
        userName,
        number,
        password,
      });
      console.log(response.data);
      window.location.href='/login';
      // Handle successful registration, navigate to login page, etc.
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
