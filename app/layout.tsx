import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "./_providers/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
  description:
    "Chat with the Future: Seamlessly Share and Discuss PDFs with AI Assistance!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          // "h-full w-full bg-gradient-to-l from-cyan-300 via-amber-200 to-purple-300 "
          "h-full w-full bg-gradient-to-r from-indigo-300 to-purple-400"
          // "h-full w-full"
          // "h-full w-full bg-gradient-to-r from-cyan-200 to-cyan-400"
          // "h-full w-full bg-gradient-to-r from-green-300 to-purple-400"
        }
      >
        <TanstackQueryProvider>
          {children}
          <Toaster />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
