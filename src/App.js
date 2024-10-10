// src/App.jsx
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import WelcomePage from './Components/WelcomePage'; 
import CreateRoomPage from './Components/CreateRoomPage'; 
import EditorPage from './Components/EditorPage';
import { ChakraProvider } from '@chakra-ui/react'


const App = () => {
  return (
    <div className='App'>
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-room" element={<CreateRoomPage />} /> 
        <Route path="/code/editor/:roomId" element={<EditorPage/>} /> 
      </Routes>
    </Router>
    </ChakraProvider>
    </div>
  );
};

export default App;
