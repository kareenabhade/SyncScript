'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { useRoom } from './RoomContext';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentRoom, setCurrentRoom } = useRoom();
  const { user } = useAuth();

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Socket connected!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected!');
      setIsConnected(false);
    });

    // socket.on('user-joined', ({ message, room }) => {
    //   setCurrentRoom(room);
    //   toast.success(message);
    // });

    setSocket(socket);

    return () => {
      socket.off('user-joined');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && currentRoom && user) {
      socket.emit('join-room', {
        roomId: currentRoom.roomId,
        userId: user._id
      });
    }
  }, [socket, currentRoom, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};