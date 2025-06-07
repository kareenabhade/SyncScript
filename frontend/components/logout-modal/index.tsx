'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import { useRoom } from "@/context/RoomContext";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
 showIcon?: boolean;
}

export function LogoutModal({showIcon=false}:LogoutModalProps) {
  const { logout } = useAuth();
  const { leaveRoom } = useRoom();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

   const handleLeaveRoom = () => {
    leaveRoom();
    router.push("/create-or-join");
  };


  if(!showIcon){
  return (
   <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
          {(!showIcon)?"Logout":<IoMdLogOut />}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border border-indigo-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-indigo-100">Confirm Logout</DialogTitle>
          <DialogDescription className="text-indigo-200/70">
            Are you sure you want to logout from your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 mt-4">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-indigo-500/20 text-indigo-200 hover:bg-indigo-500/10"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
            >
              Logout
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
   </Dialog>

  );}



  return (
   <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10">
          {<IoMdLogOut />}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border border-indigo-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-indigo-100">Confirm Leave Room</DialogTitle>
          <DialogDescription className="text-indigo-200/70">
            Are you sure you want to leave this room?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 mt-4">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-indigo-500/20 text-indigo-200 hover:bg-indigo-500/10"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              onClick={handleLeaveRoom}
              className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
            >
              Leave
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )


}