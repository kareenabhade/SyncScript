import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useRef } from "react"
import { Button } from "../ui/button"
import { useRoom } from "@/context/RoomContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSocket } from '@/context/SocketContext';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

interface Room {
  _id: string;
  roomId: string;
  roomName: string;
  users: User[];
  createdAt: string;
}


export function AllMember() {
  const { currentRoom } = useRoom() as { currentRoom: Room | null };

  console.log("Current Room -", currentRoom)

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="cursor-pointer p-1 text-indigo-200 hover:bg-indigo-500/10 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[400px] right-0 left-auto bg-gradient-to-b from-gray-900 via-[#0f1729] to-gray-900 border-l border-indigo-500/20">
        <DrawerHeader className="border-b border-indigo-500/20 px-6 py-4">
          <DrawerTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            {currentRoom?.roomName} - Members
          </DrawerTitle>
          <DrawerDescription className="text-indigo-200/70">
            {currentRoom?.users?.length ?? 0} members in this room
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6 space-y-4">

          {Array.isArray(currentRoom?.users) &&
            currentRoom?.users?.map((user: User) => (
            <div key={user._id} className="flex items-center gap-4 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20 hover:bg-indigo-500/10 transition-colors">
              <Avatar className="h-10 w-10 border-2 border-indigo-500/20">
                <AvatarImage src={user.picture} />
                <AvatarFallback className="bg-indigo-500/10 text-indigo-200">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-indigo-100 font-medium">{user.name}</h3>
                <p className="text-sm text-indigo-300/70">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter className="border-t border-indigo-500/20 px-6 py-4">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full bg-indigo-500/5 border-indigo-500/20 text-indigo-200 hover:bg-indigo-500/10 hover:text-indigo-100">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}