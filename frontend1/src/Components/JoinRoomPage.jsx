// src/Components/JoinRoomPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useSocket } from './Context/SocketContext';
import { useUser } from './Context/UserContext';

const JoinRoomPage = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const {user, setUser} = useUser();

  const socket = useSocket();


  const joinRoom = async (userName, roomId) => {
    try {


        const response = await fetch('http://localhost:7000/api/room/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          userId: user._id
        }),
      });

      const joinedRoom = await response.json();

      console.log("Join Room", joinedRoom)

      if (response.ok) {
        // socket.emit("joinRoom", { roomId, userName });
        toast({
          title: 'Joined Room Successfully!',
          description: `Welcome, ${joinedRoom.message}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });


        navigate(`/code/editor/${roomId}`);
      } 
    } catch (error) {
      toast({
        title: 'Error Joining Room',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleJoinRoom = () => {
    if (userName && roomId) {
       joinRoom(userName, roomId);
      navigate("/code/editor/665db338-abb2-4ca9-ab9c-85bc4bebaf26")

    } else {
      toast({
        title: 'All Fields Required',
        description: 'Please fill out all fields to join a room.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      p={4}
    >
      <VStack spacing={5} w="300px">
        <Heading as="h1" size="xl" color="gray.700" textAlign="center">
          Join a Room
        </Heading>

        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Your Name"
          size="lg"
          focusBorderColor="blue.500"
        />

        <Input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          size="lg"
          focusBorderColor="blue.500"
        />

        <Button
          onClick={handleJoinRoom}
          colorScheme="green"
          size="lg"
          width="100%"
        >
          Join Room
        </Button>
      </VStack>
    </Box>
  );
};

export default JoinRoomPage;
