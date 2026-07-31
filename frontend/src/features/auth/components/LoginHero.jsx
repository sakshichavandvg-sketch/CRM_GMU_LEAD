import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import QuoteBadge from "./QuoteBadge";
import CurvedDivider from "./CurvedDivider";
import BackgroundOverlay from "./BackgroundOverlay";

export default function LoginHero() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between px-8 py-10 md:px-12 md:py-16 lg:px-[60px] lg:py-[60px] text-white">
      {/* Background Image */}
      <Image
        src={IMAGES.BACKGROUND}
        alt="GM University Campus"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover object-[center_35%]"
      />

      {/* Dark maroon overlay from new component */}
      <BackgroundOverlay />

      {/* Decorative dots top right */}
      <div 
        className="absolute top-10 right-[15%] w-48 h-48 opacity-20 pointer-events-none z-10" 
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} 
      />
      {/* Decorative dots bottom left */}
      <div 
        className="absolute bottom-10 left-10 w-48 h-48 opacity-20 pointer-events-none z-10" 
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} 
      />

      <CurvedDivider />

      <div className="relative z-20 flex flex-col h-full justify-between">
        {/* Header / Logo */}
        <div className="flex items-center gap-4">
          <Image
            src={IMAGES.LOGO}
            alt="GM University Logo"
            width={52}
            height={52}
            priority
            className="drop-shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[22px] font-bold tracking-wide leading-none mb-1 text-white">GM University</h1>
            <p className="text-[13px] text-white/80 font-medium">Lead Management ERP Portal</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[18px] max-w-[500px] pb-4">
          <h2 className="text-4xl md:text-5xl lg:text-[44px] font-bold leading-[1.2] tracking-tight text-white font-sans">
            Empowering Administration,
            <br />
            Shaping <span style={{ color: '#D4AF37' }}>Futures.</span>
          </h2>
          <p className="text-[15px] text-white/90 leading-[1.6] max-w-[400px]">
            The official lead management platform built for admissions, telecalling, and administrative workflows.
          </p>
          
          <div className="mt-[28px]">
            <QuoteBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
