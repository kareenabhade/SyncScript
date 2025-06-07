'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Room {
  _id: string;
  roomId: string;
  roomName: string;
  adminId: string;
  members: string[];
  createdAt: string;
}

interface RoomContextType {
  currentRoom: Room | null;
  rooms: Room[];
  setCurrentRoom: (room: Room | null) => void;
  addRoom: (room: Room) => void;
  leaveRoom: () => void;
  updateRoomMembers: (roomId: string, members: string[]) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const router = useRouter();

  const [currentRoom, setCurrentRoom] = useState<Room | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentRoom');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rooms');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
interface SocketEvent {
  message: string;
  room: Room;
}

  useEffect(() => {
    if (!socket) return;

    const handleUserJoined = ({ message, room } : SocketEvent) => {
      if (currentRoom?.roomId === room.roomId) {
        setCurrentRoom(room);
        toast.success(message);
      }
    };

    const handleUserLeft = ({ message, room } : SocketEvent) => {
      if (currentRoom?.roomId === room.roomId) {
        setCurrentRoom(room);
        toast.success(message);
      }
    };

    const handleRoomUpdate = (updatedRoom: Room) => {
      if (currentRoom?.roomId === updatedRoom.roomId) {
        setCurrentRoom(updatedRoom);
      }
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.roomId === updatedRoom.roomId ? updatedRoom : room
        )
      );
    };

    socket.on('user-joined', handleUserJoined);
    socket.on('user-left', handleUserLeft);
    socket.on('room-updated', handleRoomUpdate);

    return () => {
      socket.off('user-joined', handleUserJoined);
      socket.off('user-left', handleUserLeft);
      socket.off('room-updated', handleRoomUpdate);
    };
  }, [socket, currentRoom?.roomId]);

  useEffect(() => {
    if (currentRoom) {
      localStorage.setItem('currentRoom', JSON.stringify(currentRoom));
    } else {
      localStorage.removeItem('currentRoom');
    }
  }, [currentRoom]);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  const addRoom = (room: Room) => {
    setRooms(prevRooms => {
      const exists = prevRooms.some(r => r.roomId === room.roomId);
      if (!exists) {
        return [...prevRooms, room];
      }
      return prevRooms;
    });
  };

  const leaveRoom = async () => {
    if (currentRoom && socket && user) {
      try {
        socket.emit('leave-room', {
          roomId: currentRoom.roomId,
          userId: user._id
        });

        setCurrentRoom(null);
        localStorage.removeItem('currentRoom');
        router.push('/create-or-join');
      } catch (error) {
        console.error('Error leaving room:', error);
        toast.error('Failed to leave room');
      }
    }
  };

  const updateRoomMembers = (roomId: string, members: string[]) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.map(room => 
        room.roomId === roomId 
          ? { ...room, members }
          : room
      );
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      return updatedRooms;
    });

    if (currentRoom?.roomId === roomId) {
      const updatedRoom = { ...currentRoom, members };
      setCurrentRoom(updatedRoom);
      localStorage.setItem('currentRoom', JSON.stringify(updatedRoom));
    }
  };

  return (
    <RoomContext.Provider value={{ 
      currentRoom, 
      rooms, 
      setCurrentRoom, 
      addRoom, 
      leaveRoom,
      updateRoomMembers 
    }}>
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within RoomProvider');
  }
  return context;
};