import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import siteLogo from './assets/logo-white.png';

export default function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
<nav className="fixed top-0 left-0 w-screen z-50 bg-black/60 text-white shadow-amber-400 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between pt-3 h-16">
          {/* Logo on the left */}
          <Link to="/" className="flex-shrink-0">
            <img src={siteLogo} alt="Site Logo" className="h-20 w-auto my-2" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/facts" className="hover:text-gray-300">Did You Know?</Link>
            <Link to="/news" className="hover:text-gray-300">News</Link>
            <Link to="/leaguevideos" className="hover:text-gray-300">Videos</Link>
             <Link to="/videohighlights" className="hover:text-gray-300">Classic Moments</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            <svg className="h-6 w-6" fill="black" stroke="black" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isNavExpanded && (
          <div className="md:hidden flex flex-col space-y-2 py-2">
            <Link to="/facts" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Did You Know?</Link>
            <Link to="/news" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">News</Link>
            <Link to="/leaguevideos" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Videos</Link>
             <Link to="/videohighlights" className="scroll-mt-20 block px-2 py-1 hover:bg-gray-700 rounded">Classic Moments</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
