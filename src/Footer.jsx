// src/components/Footer.jsx
import React from 'react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import logo from './assets/logo-white.png'
import footerimg from './assets/footerimg.png'

export default function Footer() {
    return (
        <footer className="relative w-screen bg-black/60 text-gray-400 left-1/2 -translate-x-1/2">
            {/* Main content */}
            <div className="max-w-screen mx-10 md:mx-40 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div>
                    <img
                        src={logo}
                        alt="Mile High Mashup"
                        className="h-auto w-screen px-30 md:h-30 mb-4 md:px-0 md:w-auto"
                    />
                    <p className="text-sm md:text-left">
                        Your go-to Mile High sports hub — delivering news, scores, highlights and more for the Broncos, Avalanche, Nuggets and Mammoth.
                    </p>
                </div>

                {/* Explore links */}
                <div className="flex justify-between">
                    <div>
                        <h4 className="text-white font-semibold mb-2">Explore</h4>
                        <ul className="space-y-1 text-sm">
                            <li><a href="/facts" className="hover:text-white">Did You Know?</a></li>
                            <li><a href="/news" className="hover:text-white">News</a></li>
                            <li><a href="/leaguevideos" className="hover:text-white">Videos</a></li>
                            <li><a href="/videohighlights" className="hover:text-white">Classic Moments</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-2">Follow Me</h4>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/MileHiRocks5280" aria-label="Twitter" className="hover:text-white" target='_blank'><FaTwitter size={20} /></a>
                            <a href="https://youtube.com/@MileHiMayhem303" aria-label="YouTube" className="hover:text-white" target='_blank'><FaYoutube size={20} /></a>
                            <a href="https://instagram.com/MileHiRocks5280" aria-label="Instagram" className="hover:text-white" target='_blank'><FaInstagram size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* (Optional: Newsletter or other section) */}
                <img
                    src={footerimg}
                    alt="Denver Broncos, Colorado Mammoth, Denver Nuggets, and Colorado Avalanche logos"
                    className="w-full px-20 md:w-50 h-auto md:px-0 md:ml-40"  // scales the image to full container width
                />
            </div>

            {/* Bottom bar */}
            <div className="w-full bg-black/60">
                <div className="max-w-screen-xl mx-auto px-6 py-4 text-center text-sm">
                    © {new Date().getFullYear()} Brent Ogden. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
