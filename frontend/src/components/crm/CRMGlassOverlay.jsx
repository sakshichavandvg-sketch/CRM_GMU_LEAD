import React from 'react';

export default function CRMGlassOverlay({ children, className = "" }) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none ${className}`}>
      {/* Ambient Lighting - Inner radial highlight */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 55%)"
        }}
      />
      
      {/* Glass Shine - Diagonal reflection */}
      <div 
        className="
          absolute -top-[50%] -right-[20%] h-[150%] w-[100%] 
          rotate-45 transform 
          bg-gradient-to-b from-white/10 to-transparent opacity-80
          transition-transform duration-500 ease-out
          group-hover:translate-x-[-5%] group-hover:translate-y-[5%] group-hover:opacity-100
        "
      />
    </div>
  );
}
