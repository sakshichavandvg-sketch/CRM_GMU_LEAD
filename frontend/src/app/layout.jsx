import { Inter, Lora, Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AppToast from "@/components/ui/AppToast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
      <body
        className={`${inter.variable} ${lora.variable} ${outfit.variable} antialiased`}>
        <QueryProvider>
          {children}
          <AppToast />
          <ConfirmDialog />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}