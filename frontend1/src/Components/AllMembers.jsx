import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
  Flex,
} from "@chakra-ui/react";

const AllMembers = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/user/all-users/${roomId}`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Error fetching all Users in this Room", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
      <Text fontSize="md" fontWeight="bold" mb={2} color="gray.700">
        Room Members
      </Text>
      <VStack align="start" spacing={3} w="full">
        {users && users.map((user, index) => (
          <Box
            key={index}
            w="full"
            p={2}
            bg={user.role === "admin" ? "blue.50" : "white"}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ bg: "gray.100" }}
          >
            <HStack spacing={3} align="center">
              <Avatar name={user.name} src={user.avatar} size="sm" />
              <Flex direction="column" flex="1">
                <Text fontWeight="bold" fontSize="md" color="gray.800">
                  {user.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {user.email}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Joined: {new Date(user.joinedAt).toLocaleTimeString()}
                </Text>
              </Flex>
              {user.role === "admin" && <Badge colorScheme="blue">Admin</Badge>}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AllMembers;
