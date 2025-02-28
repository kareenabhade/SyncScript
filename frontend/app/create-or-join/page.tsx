'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CreateOrJoin() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
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
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
              Create New Room
            </button>
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
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                disabled={!roomId}
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