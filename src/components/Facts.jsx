// src/Facts.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheck } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import broncosLogo from '../assets/broncos.png';
import avsLogo from '../assets/avs.png';
import mammothLogo from '../assets/mammoth.png';
import nuggetsLogo from '../assets/nuggets.png';

import broncosBg from '../assets/broncosbackground2.jpg';
import avsBg from '../assets/avsbackground.jpg';
import mammothBg from '../assets/mammothbackground.png';
import nuggetsBg from '../assets/denver-nuggets-logo-3840x2160-11719.jpg';

export default function Facts() {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        adaptiveHeight: true,
        beforeChange: (_, newIndex) => setActiveSlide(newIndex),
    };

    // Framer Motion variants for staggering
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const slides = [
        {
            title: 'Denver Broncos',
            titleColor: '#FB4F14',
            bg: broncosBg,
            logo: broncosLogo,
            stats: [
                '15 Division Championships',
                '22 Playoff Appearances',
                '8 Conference Titles',
                '3 Super Bowl Championships',
            ],
            bullets: [
                '15 Hall-of-Famers (* are enshrined as Broncos) — John Elway*, Floyd Little*, Shannon Sharpe*, Terrell Davis*, Champ Bailey*, Steve Atwater*, Pat Bowlen*, Willie Brown, Brian Dawkins, Tony Dorsett, Randy Gradishar*, Ty Law, John Lynch, Peyton Manning*, DeMarcus Ware, Gary Zimmerman*',
                'Have sold out every home game since 1970 (longest sellout streak in the 4 major professional sports)',
            ],
        },
        {
            title: 'Colorado Avalanche',
            titleColor: '#236192',
            bg: avsBg,
            logo: avsLogo,
            stats: [
                '12 Division Championships',
                "3 President's Trophies",
                '28 Playoff Appearances',
                '3 Conference Titles',
                '3 Stanley Cup Championships',
            ],
            bullets: [
                '6 Hall-of-Famers — Ray Bourque, Joe Sakic, Patrick Roy, Peter Forsberg, etc.',
                'Won 3 Cups (including their first season in Colorado) - (3–0 in Finals)',
            ],
        },
        {
            title: 'Denver Nuggets',
            titleColor: '#FEC524',
            bg: nuggetsBg,
            logo: nuggetsLogo,
            stats: [
                '3 MVPs (2021, 2022, 2024)',
                '12 Division Titles',
                '31 Playoff Appearances',
                '1 Conference Title',
                '1 NBA Championship',
            ],
            bullets: [
                '7 Retired Numbers — 2, 12, 33, 40, 44, 55, 432',
                'Won their first NBA Championship in 2023',
            ],
        },
        {
            title: 'Colorado Mammoth',
            titleColor: '#B0B6BB',
            bg: mammothBg,
            logo: mammothLogo,
            stats: [
                '3 Division Titles',
                '18 Playoff Appearances',
                '2 Conference Titles',
                '2 NLL Championships',
                '2nd in NLL for Attendance',
            ],
            bullets: [
                '4 Hall-of-Famers — Gary Gait, Paul Gait, Dan Stroup, Pat Coyle',
                'Both titles clinched on the road vs. Buffalo Bandits',
                'Have averaged 14,077 fans per game since moving to Denver - 2nd in the league over the last 3 seasons',
            ],
        },
    ];

    // Use the active slide's titleColor for the shadow
    const shadowColor = slides[activeSlide].titleColor;

    return (
        <div className="md:max-w-4xl mw-2xl mx-auto py-12">
            {/* Wrapper with dynamic colored shadow */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 0 20px ${shadowColor}` }}
            >
                <Slider {...settings}>
                    {slides.map(({ title, titleColor, bg, logo, stats, bullets }, idx) => {
                        const isActive = idx === activeSlide;
                        return (
                            <div key={title} className="relative md:h-[500px] bg-black/80">
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${bg})` }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/70" />

                                {/* Slide content */}
                                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 text-white">
                                    <div className="md:text-center">
                                        <img
                                            src={logo}
                                            alt={`${title} Logo`}
                                            className="w-16 h-auto mx-auto mb-4"
                                        />
                                        <h3
                                            className="text-5xl font-bold mb-8"
                                            style={{ color: titleColor }}
                                        >
                                            {title}
                                        </h3>

                                        {/* Stats with staggered animation */}
                                        <motion.div
                                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:pl-10 contain-content"
                                            variants={container}
                                            initial="hidden"
                                            animate={isActive ? 'visible' : 'hidden'}
                                        >
                                            {stats.map(s => (
                                                <motion.div
                                                    key={s}
                                                    className="flex text-left md:items-center text-xl font-semibold"
                                                    variants={item}
                                                >
                                                    <FaCheck className="mr-3 flex-shrink-0" style={{ color: titleColor }} />
                                                    <span>{s}</span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Bullets with staggered animation */}
                                    <motion.ul
                                        className="md:pl-6 md:space-y-4 text-lg text-left"
                                        variants={container}
                                        initial="hidden"
                                        animate={isActive ? 'visible' : 'hidden'}
                                    >
                                        {bullets.map(b => (
                                            <motion.li
                                                key={b}
                                                variants={item}
                                                className="flex items-start"
                                            >
                                                <FaStar className="mt-1 mr-3 flex-shrink-0" style={{ color: titleColor }} />
                                                <span>{b}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
