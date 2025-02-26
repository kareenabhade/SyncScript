import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUser } from './Context/UserContext';
import { Box, 
         Button, 
         Heading, 
         Text, 
         VStack, 
         HStack, 
         Highlight,
         Menu,
         MenuButton,
         MenuList,
         MenuItem,
         Avatar,  } from '@chakra-ui/react';


const WelcomePage = () => {
  const navigate = useNavigate();
  const {logout } = useAuth0();
   const { user } = useUser();

  console.log("User", user)

  const handleJoinRoom = () => {
    navigate('/join-room');
  };

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  const handleProfile = ()=>{

  }
  const handleLogout = ()=>{
    
  }

  return (
    <>
    <Box  width="100%" height="100vh" style={{padding:"0px 100px"}}>
    <Box style={{display:"flex", justifyContent:"space-between"}} >
    <Heading size="xl" letterSpacing="tight" fontWeight="bold" color="#F2F9FF"
                     p={5} pl="30px" >
      <Highlight query="Script" styles={{ color: "#0D92F4" }}>
      Sync-Script
      </Highlight>
       <Highlight query="</>" styles={{ color: "#F2F9FF" }}>
         {" </>"}
       </Highlight>
    </Heading>

    
    <Box style={{ marginTop: "20px" }}>
            <Menu>
              <MenuButton>
                <Avatar src={user?.picture} size="sm" cursor="pointer" />
              </MenuButton>
              <MenuList minWidth="100px" color='black' >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem color="red" 
                     onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
    </Box>
    
    

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80%"
      p={4}
    >
    
   <Heading mb={10} size="lg" color="white">
      <Highlight 
        query={user?.name || ""} 
        styles={{ color: "#FF407D"}}
      >
        {`Hi ! ${user?.name || "Guest"}`}
      </Highlight> 
   </Heading>

      <VStack spacing={5} maxW="lg" textAlign="center">
        <Heading size="2xl" color="white" fontFamily="Open Sans" fontWeight="semibold" >
          Welcome to the Collaborative Code Editor!
        </Heading>
        <Text fontStyle="italic" color="white">
          "Code together, learn together!"
        </Text>

        <HStack spacing={4}>
          <Button colorScheme="blue" size="lg" onClick={handleJoinRoom}>
            Join Room
          </Button>
          <Button colorScheme="teal" size="lg" onClick={handleCreateRoom}>
            Create Room
          </Button>
        </HStack>
      </VStack>
    </Box>
  </Box>
    </>
  );
};

export default WelcomePage;
