# Mile High Mashup

A Denver sports news and highlights hub—bringing you real-time scores, standings, news, and video highlights for the Broncos, Nuggets, Avalanche, Mammoth, and more. Built with React, Vite, and TailwindCSS, and deployed on Netlify.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
  - [Building for Production](#building-for-production)  
- [Folder Structure](#folder-structure)  


---

## Demo

Live site: https://milehighmashup.com

---

## Features

- **Real-Time Scores & News** — Pulls live game scores, news, and videos for Denver teams via ESPN APIs.   
- **News Aggregator** — Latest articles and headlines curated for Denver sports fans.  
- **Highlight Carousel** — Animated video highlights and image galleries.   
- **Responsive Design** — Mobile-first layout optimized for all screen sizes.  
- **SEO Optimized** — Metadata and structured data for better search visibility.  

---

## Tech Stack

- **Framework:** React  
- **Bundler:** Vite  
- **Styling:** TailwindCSS  
- **Routing:** React Router  
- **Data Fetching:** Axios  
- **APIs:** ESPN   
- **Animations:** Framer Motion  
- **Deployment:** Netlify  

---

## Getting Started

### Prerequisites

- Node.js ≥ 16.x  
- npm or Yarn  

### Installation

```bash
git clone https://github.com/your-username/milehighmashup_React.git
cd milehighmashup_React
npm install
# or
yarn
```

### Folder Structure

```
.
├── public/                    # Static assets (favicon, images, robots.txt)
├── src/
│   ├── api/                   # ESPN & MySportsFeeds service modules
│   ├── assets/                # Logos, images, icons
│   ├── components/            # UI components (ScoreCard, NewsFeed, Carousel, etc.)
│   ├── data/                  # API scrape for images
│   ├── utilities/             # Daily timeline and Google image scrapes
│   ├── App.jsx                # Routes & layout
│   └── main.jsx               # Application entrypoint
├── .gitignore                 # Ignore rules
├── netlify.toml               # Netlify configuration
├── tailwind.config.js
├── vite.config.js
└── README.md
