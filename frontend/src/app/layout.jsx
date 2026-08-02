import { Inter, Lora, Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AppToast from "@/components/ui/AppToast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthBootstrap from "@/features/auth/components/AuthBootstrap";
import PreviewBadge from "@/components/ui/PreviewBadge";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and Bold
  variable: "--font-lora", // Creates a CSS variable
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, Semi-Bold
  variable: "--font-inter", // Creates a CSS variable
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${lora.variable} ${outfit.variable} antialiased`}>
        <QueryProvider>
          <AuthBootstrap />
          {children}
          <AppToast />
          <ConfirmDialog />
          <PreviewBadge />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}