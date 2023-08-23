import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Auth/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        {/* Buttons to navigate */}
        <Link to="/login">Go to Login</Link>
        <Link to="/signup">Go to Register</Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
