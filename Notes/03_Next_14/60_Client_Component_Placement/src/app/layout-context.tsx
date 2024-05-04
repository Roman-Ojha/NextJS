// NOTE: this is the layout.tsx, just for note I have made it as 'layout-context.tsx'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// creating app context default value
type Theme = {
  colors: {
    primary: string;
    secondary: string;
  };
};
const defaultTheme: Theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
  },
};

// Creating Theme context which we will provide inside the application
const ThemeContext = createContext<Theme>(defaultTheme);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Providing the Theme context inside the children component */}
      <ThemeContext.Provider value={defaultTheme}>
        {/* NOTE: this will throw an error because context provider can't work on the server component rather we have to create the client component to work on it */}
        {/* To solve this error we can use 'use client' directive on this layout.tsx file but this approach signal next.js that this component along with any component it imports are intended for client side execution that is not what we want */}
        {/* To fix this we need to create our context and render it's provider inside a separate client component */}
        <body className={inter.className}>{children}</body>
      </ThemeContext.Provider>
    </html>
  );
}
