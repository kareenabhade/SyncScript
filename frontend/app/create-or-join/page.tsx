'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRoom } from '@/context/RoomContext';
import { useRouter } from 'next/navigation';
import { LogoutModal } from '@/components/logout-modal';
import { ProfileModal } from '@/components/profile-modal';
import { useSocket } from '@/context/SocketContext';
import { toast } from 'sonner';

export default function CreateOrJoin() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const { setCurrentRoom } = useRoom();
  const { socket } = useSocket();

  const generateRoomId = () => {
    return 'room_' + Math.random().toString(36).substr(2, 9);
  };

 const handleJoinRoom = async () => {
  if (joinRoomId) {
    try {
      const response = await fetch('http://localhost:7000/api/room/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          roomId: joinRoomId,
          userId: user?._id,
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        if (data.isAdmin) {
          toast.error("Room admin cannot join as a member");
          return;
        }
       setCurrentRoom(data.room);
       localStorage.setItem('currentRoom', JSON.stringify(data.room));
          // Emit socket event for joining room
        socket?.emit('join-room', {
            roomId: joinRoomId,
            userId: user?._id
          });
        toast.success('Successfully joined the room');
        router.push(`/code-editor/${joinRoomId}`);
      } else {
        toast.error(data.message || 'Failed to join room');
      }
    } catch (error: any) {
      toast.error('Failed to join room');
    }
  } else {
    toast.error('Please enter a room ID');
  }
};

 const handleCreateRoom = async() => {
  if (roomName) {
    try {
      const response = await fetch('http://localhost:7000/api/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          roomId: roomId,
          roomName: roomName,
          adminId: user?._id,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentRoom(data.room);
        localStorage.setItem('currentRoom', JSON.stringify(data.room));
          // Emit socket event for joining room
         socket?.emit('join-room', {
            roomId: roomId,
            userId: user?._id
          });
        toast.success('Room created successfully');
        router.push(`/code-editor/${roomId}`);
      } else {
        toast.error('Failed to create room', data.message);
      }
    } catch (error:any) {
      toast.error('Failed to create room', error);
    }
  } else {
    toast.error('Please enter a room name');
  }
};

   useEffect(()=>{
     const newRoomId = generateRoomId();
     setRoomId(newRoomId);
   },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
     {user && (
      <div className="absolute top-4 right-4 ">
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer flex items-center gap-3 bg-slate-800/70 p-2 pl-4 rounded-full backdrop-blur-sm border border-slate-700 hover:bg-slate-800/90 transition-all"
          >
            <span className="text-white font-medium">{user.name}</span>
            {user.picture && (
              <Image
                src={user.picture}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-slate-700"
              />
            )}
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl z-100">
              <ProfileModal />
              <LogoutModal /> 
            </div>
          )}
        </div>
      </div>
    )}
    
      
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Choose Your Path
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Room Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Create Room</h2>
            <p className="text-gray-400 mb-6">
              Start a new collaborative coding session and invite others to join.
            </p>
             <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-2  bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
         <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-600/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Room ID:</span>
            <code className="text-purple-400 font-mono text-sm select-all">
              {roomId}
            </code>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              toast.success('Room ID copied!');
            }}
            className="cursor-pointer text-xs px-2 py-1 bg-slate-700 text-white rounded flex items-center gap-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
              />
            </svg>
          </button>
        </div>
        
    <button
            onClick={handleCreateRoom}
             className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
              Create New Room
            </button>
            </div>
          </motion.div>

          {/* Join Room Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Join Room</h2>
            <p className="text-gray-400 mb-6">
              Enter a room ID to join an existing collaborative session.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                onClick={handleJoinRoom}
                className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                disabled={!joinRoomId}
              >
                Join Room
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Tip: Share your room ID with teammates to collaborate together
          </p>
        </div>
      </div>
    </div>
  );
}