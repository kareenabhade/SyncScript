// src/App.jsx
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import WelcomePage from './Components/WelcomePage'; 
import CreateRoomPage from './Components/CreateRoomPage'; 
import JoinRoomPage from './Components/JoinRoomPage';
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './Components/Layout';
import { SocketProvider } from './Components/Context/SocketContext';
import { UserProvider } from './Components/Context/UserContext';
import HomePage from './Components/HomePage';


const App = () => {
  return (
    <div className='App'>
    <SocketProvider >
      <UserProvider>
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-room" element={<CreateRoomPage />} /> 
        <Route path="/join-room" element={<JoinRoomPage />} />
        <Route path="/code/editor/:roomId" element={<Layout/>} /> 
        <Route path='/sync' element={<WelcomePage />}/>
      </Routes>
    </Router>
    </ChakraProvider>
    </UserProvider>
    </SocketProvider>
    </div>
  );
};

export default App;
