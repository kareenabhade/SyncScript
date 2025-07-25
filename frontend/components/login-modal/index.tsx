'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { log } from 'console';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

    const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    
    if(isSignUp){
    try {
      const response = await fetch('http://localhost:5000/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email,
          password,
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random` 
        }),
      });

      const data = await response.json();

      console.log("create user response ", data)

      if (!data.success) {
        throw new Error(data.message);
      }

      // Store user data
      login(data.token, data.user);
      toast.success(data.message);
      router.push('/create-or-join');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to authenticate');
    } finally {
      setIsLoading(false);
      onClose();
    }
    }
    else{
       try {
        console.log("email ", email, " passsword ", password);
        const response = await fetch("http://localhost:7000/api/user/login",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          }),
        })

        const data = await response.json();
        console.log("login response ", data);

        if(data.success){
          login(data.token, data.user);
          toast.success(data.message);
          router.push('/create-or-join');
        }
        else{
          toast.error(data.message);
        }
       } catch (error:any) {
          toast.error(error.message);
       }

    }
    setIsLoading(false);
    onClose();
 
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-8 rounded-2xl shadow-xl w-[90vw] max-w-md border border-slate-800">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400 mb-8 text-center">
              {isSignUp ? 'Join the collaboration' : 'Sign in to start collaborating'}
            </p>

            <div className="w-full space-y-4 mb-6">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
              <button 
              onClick={handleSubmit}
              className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            <div className="relative w-full mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-slate-900">Or continue with</span>
              </div>
            </div>

            <button
              onClick={() => {/* Google auth handler will go here */}}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FcGoogle className="text-2xl" />
              Google
            </button>

            <p className="mt-6 text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() =>{setIsSignUp(!isSignUp)}
                }
                className="cursor-pointer text-purple-500 hover:text-purple-400"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}