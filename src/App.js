// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import WelcomePage from './Components/WelcomePage'; 
import CreateRoomPage from './Components/CreateRoomPage'; // Import the new CreateRoomPage component

import CodeEditor from './Components/CodeEditor';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-room" element={<CreateRoomPage />} /> {/* New route for CreateRoomPage */}
        <Route path="/editor/:roomId" element={<CodeEditor/>} /> {/* Placeholder for the room */}
      </Routes>
    </Router>
  );
};

export default App;
