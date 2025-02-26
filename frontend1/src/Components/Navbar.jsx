import {
  Box,
  Flex,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import AllMembers from "./AllMembers";
import logo from "./Images/coding.png";
import allMember from "./Images/friends.png";
import logoutImg from "./Images/logout.png";
import { useUser } from "./Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the drawer
  const {logout } = useAuth0();
  
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure(); // For the logout dialog
  const { user } = useUser();

  console.log("logged in user ", user);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here (e.g., clearing user session, localStorage, etc.)
    // onLogoutClose();

    logout({ logoutParams: { returnTo: window.location.origin } })

  };

  return (
    <>
      <Box
        height="50px"
        bgGradient="linear(to-b, rgb(0, 0, 0), #0f0a19)"
        mb={2}
        p={3}
      >
        <Flex align="center" p={2}>
          {/* Logo and Title */}
          <Text
            fontFamily="Rubik"
            fontWeight="400"
            fontSize="xl"
            sx={{
              textShadow: "1px 1px 1px black",
              color: "white",
            }}
          >
            Sync-Script
          </Text>
          <img
            src={logo}
            alt="Logo"
            height="40px"
            width="40px"
            style={{ marginLeft: "8px" }}
          />

          {/* All Members Button */}
          <Button
            ml="auto"
            mr="15px"
            size="md"
            bg="blackAlpha.200"
            color="white"
            onClick={onOpen}
          >
            <img src={allMember} alt="All Members" height={40} width={40} />
          </Button>

          {/* User Avatar */}
          <Avatar
            variant="solid"
            name={user?.name || "Guest"}
            bg="whiteAlpha.800"
            size="sm"
          />

          {/* Logout Button */}
          <img
            src={logoutImg}
            alt="Logout"
            height={30}
            width={30}
            style={{ margin: "0px 25px", cursor: "pointer" }}
            onClick={onLogoutOpen}
          />
        </Flex>
      </Box>

      {/* Drawer for All Members */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>All Members -</DrawerHeader>
          <DrawerBody>
            <AllMembers />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Logout Dialog */}
      <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalBody>
            Are you sure you want to log out?
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onLogoutClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
