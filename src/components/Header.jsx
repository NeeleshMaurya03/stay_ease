'use client';

import { Suspense, useState } from 'react';
import { FaSearch, FaHome, FaInfoCircle, FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 flex-1 max-w-md mx-6 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-400"
    >
      <input
        type="text"
        placeholder="Find budget stays near..."
        className="bg-transparent w-full focus:outline-none text-sm text-gray-700 placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="text-gray-500 hover:text-emerald-600">
        <FaSearch />
      </button>
    </form>
  );
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            StayEase
          </h1>
        </Link>

        <Suspense fallback={<div className="flex-1 max-w-md mx-6" />}>
          <SearchBar />
        </Suspense>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link 
            href="/" 
            className={`hidden md:flex items-center gap-1 ${pathname === '/' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-500'}`}
          >
            <FaHome className="text-lg" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          
          <Link 
            href="/favorites" 
            className={`hidden md:flex items-center gap-1 ${pathname === '/favorites' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-500'}`}
          >
            <FaHeart className="text-lg" />
            <span className="text-sm font-medium">Favorites</span>
          </Link>
          
          <Link 
            href="/about" 
            className={`hidden md:flex items-center gap-1 ${pathname === '/about' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-500'}`}
          >
            <FaInfoCircle className="text-lg" />
            <span className="text-sm font-medium">About</span>
          </Link>

          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8 border-2 border-emerald-200",
                }
              }} />
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50 transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-700 transition hidden sm:block">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;