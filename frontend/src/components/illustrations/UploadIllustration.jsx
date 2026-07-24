"use client";
import React from "react";
export default function UploadIllustration({ state = "idle", className = "" }) {
  // state: "idle" | "dragging" | "uploading"
  const isDragging = state === "dragging";
  const isUploading = state === "uploading";

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ease-out ${isDragging ? 'scale-105' : 'scale-100'} ${className}`}
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes floatDoc {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes uploadLoop {
            0% { transform: translateY(15px); opacity: 0; }
            20% { transform: translateY(5px); opacity: 1; }
            70% { transform: translateY(-10px); opacity: 1; }
            100% { transform: translateY(-25px); opacity: 0; }
          }
          @keyframes pulseCloud {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes bounceArrow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          
          .doc-idle {
            animation: floatDoc 3s ease-in-out infinite;
          }
          .doc-uploading {
            animation: uploadLoop 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .cloud-pulse {
            animation: pulseCloud 3s ease-in-out infinite;
            transform-origin: center;
          }
          .arrow-anim {
            animation: bounceArrow 2s ease-in-out infinite;
          }
        `}
      </style>
      {/* Background glow when dragging */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="#6F1D28"
        className={`transition-opacity duration-300 ${isDragging ? 'opacity-5' : 'opacity-0'}`}
      />
      {/* Document Group */}
      <g className={isUploading ? 'doc-uploading' : 'doc-idle'}>
        {/* Document Body */}
        <rect
          x="38"
          y={isUploading ? "45" : "50"}
          width="44"
          height="56"
          rx="6"
          fill="white"
          stroke={isDragging || isUploading ? "#6F1D28" : "#9CA3AF"}
          strokeWidth="3.5"
          className="transition-colors duration-300"
        />

        {/* Document Lines */}
        <path
          d={isUploading ? "M48 65h24 M48 75h24 M48 85h14" : "M48 70h24 M48 80h24 M48 90h14"}
          stroke={isDragging || isUploading ? "#6F1D28" : "#D1D5DB"}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />

        {/* CSV Badge */}
        <rect
          x="60"
          y={isUploading ? "38" : "43"}
          width="28"
          height="16"
          rx="4"
          fill={isDragging || isUploading ? "#6F1D28" : "#6B7280"}
          className="transition-colors duration-300"
        />
        <text
          x="74"
          y={isUploading ? "49" : "54"}
          fill="white"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          CSV
        </text>
      </g>
      {/* Cloud Group (layered on top so document goes "inside" it) */}
      <g className={isDragging || isUploading ? 'cloud-pulse' : ''}>
        {/* Solid light blue background for cloud */}
        <path
          d="M84.4 46.1C83.5 35.8 74.8 28 64 28c-8.4 0-15.6 5.1-18.7 12.5C36.9 41.2 30 48.6 30 57.5c0 9.7 7.8 17.5 17.5 17.5h35c8.6 0 15.5-7 15.5-15.5 0-7.3-5.1-13.4-11.8-15.1l-1.8.1z"
          fill="#E0F2FE"
        />
        {/* Cloud Border */}
        <path
          d="M84.4 46.1C83.5 35.8 74.8 28 64 28c-8.4 0-15.6 5.1-18.7 12.5C36.9 41.2 30 48.6 30 57.5c0 9.7 7.8 17.5 17.5 17.5h35c8.6 0 15.5-7 15.5-15.5 0-7.3-5.1-13.4-11.8-15.1l-1.8.1z"
          fill="none"
          stroke={isDragging || isUploading ? "#6F1D28" : "#BAE6FD"}
          strokeWidth="4"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
      </g>
      {/* Upload Arrow (hidden when uploading) */}
      <g className={`transition-opacity duration-300 ${isUploading ? 'opacity-0' : 'opacity-100'}`}>
        <path
          d="M60 74V50 M51 59l9-9 9 9"
          stroke="#6F1D28"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-anim transition-colors duration-300"
        />
      </g>
    </svg>
  );
}