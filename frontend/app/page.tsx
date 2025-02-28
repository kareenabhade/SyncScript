"use client"

import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedFeature, AnimatedContainer } from "@/components/animated-section";
import { useState } from 'react';
import { LoginModal } from '@/components/login-modal';

export default function Home() {
   const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative ">
      <main className="relative flex flex-col items-center justify-center min-h-screen py-12 sm:py-16 px-4">
        <AnimatedContainer>
          <AnimatedSection className="mb-12 sm:mb-16">
            <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              SyncScript
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mb-12 sm:mb-16">
            <p className=" font-sans text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl leading-relaxed">
              Experience real-time collaborative coding with your team. 
              <span className="block mt-2 text-gray-400">Code together, learn together.</span>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="mb-12 sm:mb-16">
            <Button 
            onClick={() => setShowModal(true)}
            className="font-sans bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
              Start Collaboration 
            </Button>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              { icon: "🚀", title: "Real-time Sync", desc: "Code changes reflect instantly" },
              { icon: "🧑‍💻", title: "Collaborative", desc: "Work together seamlessly" },
              { icon: "🛡️", title: "Secure", desc: "Private and protected rooms" },
            ].map((feature, i) => (
              <AnimatedSection className="mb-12 sm:mb-16" key={i} delay={0.6 + i * 0.1}>
                <AnimatedFeature>
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{feature.desc}</p>
                </AnimatedFeature>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedContainer>

    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <LoginModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
      </main>
    </div>
  );
}