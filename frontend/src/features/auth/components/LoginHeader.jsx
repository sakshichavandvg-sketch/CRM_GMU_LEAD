import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[#5B0B0B] p-2 rounded-full border border-white shadow-md mb-4">
        <Image
          src={IMAGES.LOGO}
          alt="GM University"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-[var(--gmu-maroon)] font-inter">
        Welcome Back
      </p>

      <h1 className="mt-2 text-2xl md:text-3xl lg:text-4xl leading-tight font-bold text-[var(--gmu-text)] font-sans tracking-tight">
        Lead Management
      </h1>
    </div>
  );
}
