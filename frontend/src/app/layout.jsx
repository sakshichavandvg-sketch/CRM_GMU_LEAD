import { Inter, Lora } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </QueryProvider>
      </body>
    </html>
  );
}