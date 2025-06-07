import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { RiContactsFill } from "react-icons/ri";

interface ProfileModalProps {
  showIcon?: boolean;
}

export function ProfileModal({showIcon = false}: ProfileModalProps) {
  const { user, logout } = useAuth();
  // const memberSince = new Date(user?.createdAt).toLocaleDateString();
  return (
    <Dialog>
      <DialogTrigger className="text-white flex text-center items-center cursor-pointer">
       <div className="ml-4">{(!showIcon)?"Profile": <RiContactsFill /> }</div> 
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 via-[#0f1729] to-gray-900 border border-indigo-500/20">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Profile Information
          </DialogTitle>
          <DialogDescription className="text-indigo-200/70">
            Your account details
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full  opacity-50"></div>
            <div className="relative">
             {user?.picture && (
               <Avatar className="h-15 w-15" >
                 <AvatarImage src={user?.picture} />
                 <AvatarFallback>{user.name}</AvatarFallback>
               </Avatar>
              )}
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-indigo-200/70">{user?.email}</p>
          </div>

          {/* <div className="w-full space-y-4">
            <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
              <h3 className="text-sm font-medium text-indigo-200/70 mb-1">Member Since</h3>
              <p className="text-lg text-white">{ memberSince}</p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}