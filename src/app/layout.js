'use client';

import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}