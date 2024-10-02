// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import WelcomePage from './Components/WelcomePage'; 
import CreateRoomPage from './Components/CreateRoomPage'; // Import the new CreateRoomPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-room" element={<CreateRoomPage />} /> {/* New route for CreateRoomPage */}
        <Route path="/editor/:roomID" element={<h2>Room Page</h2>} /> {/* Placeholder for the room */}
      </Routes>
    </Router>
  );
};

export default App;
