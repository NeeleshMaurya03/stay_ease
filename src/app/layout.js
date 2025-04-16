'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from '../components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#059669', // emerald-600
          colorTextOnPrimaryBackground: '#fff'
        }
      }}
    >
      <Provider store={store}>
        <html lang="en">
          <body className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            {/* Footer can be added here */}
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}