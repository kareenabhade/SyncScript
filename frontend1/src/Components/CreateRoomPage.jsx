import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from './Context/SocketContext';
import { useUser } from './Context/UserContext';
import { useAuth0 } from "@auth0/auth0-react";

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

const CreateRoomPage = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  
  const socket = useSocket();

  const { user, setUser} = useUser();
  console.log("in create room page", user)

  const createAdminUser = async (userName, roomId) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          roomId,
          role: "admin"
        })
      });

      const data = await response.json();
      console.log("user created", data);
      await setAdminId(data.user._id);
    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  const createRoom = async () => {

    console.log("ROOM ID ", roomId);
    console.log("ADMIN ID ", user._id);
    try {
      const response = await fetch("http://localhost:5000/api/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomId,
          adminId:user._id
        })
      });

      const data = await response.json();
      console.log("room created:", data);

      if(data) navigate(`/code/editor/${roomId}`);

      // Create socket room after room creation in the database
      // socket.emit('joinRoom', roomId); // Join the socket room
    } catch (error) {
      console.log("Error creating room", error);
    }
};

  const handleGenerateRoomId1 = async () => {
    if (userName) {
      const newRoomId = uuidv4(); // Generate a new Room ID
      setRoomId(newRoomId);
      
      await createAdminUser(userName, newRoomId); // Create the admin user

      // Create room and join the socket room
      await createRoom();

      // Emit create-room event to the backend
    socket.emit('create-room', { roomId: newRoomId, adminName: userName });

    // Listen for room-created event
    socket.on('room-created', ({ roomId }) => {
      console.log(`Room created with ID: ${roomId}`);
    });
  
     



      toast({
        title: 'Room ID Generated!',
        description: `Room ID: ${newRoomId}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Name Required',
        description: 'Please enter your name to generate a Room ID.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };


const handleGenerateRoomId = async () => {
    
  if (userName) {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
  }
};


  const handleJoinRoom = async (roomId) => {
    if (roomId) {

      
      await createRoom();
      // socket.emit('join-room', { roomId, userName });

    } else {
      toast({
        title: 'Room ID Required',
        description: 'Please enter or generate a Room ID first.',
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
    
      p={4}
    >
      <VStack spacing={5} w="300px">
        <Heading as="h1" size="xl" color="white" textAlign="center">
          Create a Room
        </Heading>
        
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Your Name"
          size="lg"
          focusBorderColor="blue.500"
        />
        
        <Button
          onClick={handleGenerateRoomId}
          colorScheme="blue"
          size="lg"
          width="100%"
        >
          Generate Room ID
        </Button>

        {roomId && (
          <Box
            p={4}
            bg="white"
            shadow="md"
            rounded="md"
            w="100%"
            textAlign="center"
          >
            <Heading as="h2" size="md" color="gray.700">
              Room Created!
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Your Name: {userName}
            </Text>
            <Text fontSize="lg" color="gray.600">
              Room ID: {roomId}
            </Text>
            <Button
              onClick={() => handleJoinRoom(roomId)}
              colorScheme="green"
              size="lg"
              mt={4}
              width="100%"
            >
              Join Room
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CreateRoomPage;
