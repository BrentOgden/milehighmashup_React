// src/components/VideoHighlights.jsx
import React from 'react'
import '../index.css'
import '../App.css'


import broncosBg  from '../assets/broncosVidBg.png'
import avsBg      from '../assets/avsVidBg.png'
import nuggetsBg  from '../assets/nuggetsVidBg.png'
import mammothBg from '../assets/mammothVidBg.png'

/** Single video embed + optional description */
function VideoEmbed({ embedHtml, description }) {
  return (
    <div className="video-item text-center">
      <div
        className="video-iframe-wrapper"
        dangerouslySetInnerHTML={{ __html: embedHtml }}
      />
      {description && (
        <p className="mt-2 text-sm text-white">
          {description}
        </p>
      )}
    </div>
  )
}

export default function VideoHighlights() {
  const broncosVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XCE8jf7Iil4?si=62RkpPaibb8phz_J" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Von Miller strip sack for the TD in Super Bowl 50',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/BuL1QaVXUpM?si=_elvJt81HfD9jA71" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'John Elway leads Denver to a win in Super Bowl XXXII with the famous "helicopter play"',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xPa_FWrIL6Q?si=AcFf6RVoXcTecAlC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: '"The Drive" quickly becomes legend as the Broncos win the 1986 AFC Championship in epic fashion',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fkk6WZnUNfo?si=o4aKHietUw3CBGyL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The Broncos use "The Fumble" to hang on and win the 1987 AFC Championship',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Yh68klo7OrA?si=dtNmUYsdJ8HORzt1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Demaryius Thomas walks off the Steelers in OT to win the 2011 AFC Wildcard game',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/jQDPCY4ZD6I?si=xPvyd69I3s-EFpTk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'John Elway leads incredible 15-point comeback to beat the Tennessee Titans in the 1991 AFC Divisional Playoff',
    },
  ]

  const avsVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-f8_1AwNeTk?si=g8dQFcsvsq1iPtAP&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'From their move to Denver in 1996 to earning the city’s first pro sports championship that same season - relive the 1996 drive to the Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RHox0QhOG-s?si=9pHxv-fM7Iz48OPy&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Recapping the epic 2001 Stanley Cup Championship run that earned Ray Bourque his elusive Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/84fHrT0Y_C4?si=TWaqu_G3_AOWLFk8&amp;start=63" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'For the first time since 2001, the Avalanche return to the top of the NHL. Relive the 2022 Stanley Cup Championship run to earn the Avs their 3rd Stanley Cup',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/vJlCdIOWkYM?si=d1Xmt8guftmaZzwE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'In an epic rivalry riddled with great moments, no one will ever forget the infamous goalie brawl between Patrick Roy and Chris Osgood',
    },
  ]

  const nuggetsVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pif3R6BeCWs?si=Txc0-5LyL75-UYEa" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The final moments of the historic Game 5 in 2023 that earned the Nuggets their first ever NBA Championship',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/inCcQgcWmY8?si=o6gtR0q39PG1gh1n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Jamal Murray’s two game-winning shots in the 2024 NBA Playoffs to help knock out the Lakers',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LEoCn0qB5tk?si=tuZTqBcJXwQwaE17" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'Aaron Gordon’s INSANE buzzer-beater dunk in Game 5 of the 2025 NBA Playoffs',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VXA8RLzMMdM?si=bsCbzNaKxv68XRfW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'The final moments of an extraordinary Game 1 of the 2025 Western Conference Semifinals… capped off by another Aaron Gordon game winner',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gEQgHW_3vOQ?si=SNWqQPHn5MwZlnvZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`,
      description: 'One of the greatest moments for the Nuggets in the 1990s, Dikembe Mutombo celebrates the Nuggets becoming the 1st 8-seed to ever beat a 1-seed as they upset Seattle',
    },
  ]
  const mammothVideos = [
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FOBZnManJxw?si=YoaD2tYHQGMcERUp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'One of the most exciting moments to see live, the epic hit laid out by Mammoth backup goaltender Alex Buque versus the rival Roughnecks',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/g0r_-EokxOY?si=Nomao6DoOtBNSxdj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'The final seconds and celebration of the Mammoth securing their 2nd NLL Cup - once again on the road in Buffalo',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8l4mbaKkzFY?si=nIEDq_xB7mlfMwES" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth superstar Adam Jones securing a sock trick with 6 goals in the 4th quarter in a game against Vancouver',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fE0lPgjoPEo?si=LUNCDDX97qbxGl3T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Amazing behind the net dunk goal for Drew Westervelt against Vancouver',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/rejchmYEamw?si=9nNZs5oZY-PK_UUx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth Hall of Famer John Grant Jr. scoring a clutch game winner versus the Georgia Swarm',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/W26eqHyw9Z8?si=1v-z0FUcdwXuvDpD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Just one of many game winners from Mammoth Hall of Famer John Grant Jr. - this one to win it in OT',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nBEvwTmxAYw?si=vHncIanKaO4ajkUu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Mammoth fan favorite Eli McLaughlin scores 5 goals and leads the team past San Diego and into the NLL Finals in 2022',
    },
    {
      embedHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/5bsZlAA8Hqc?si=zE2SZ9vCYKqQjx8L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      description: 'Full highlights from one of the most incredible comebacks in Mammoth history as they score 7 unanswered goals in the 4th to win in overtime',
    },
  ]

  return (
    <>
    <div className='font-bold pt-20 md:text-lg text-center'>
        <h2 className='text-4xl text-shadow-lg text-shadow-amber-500/50'>Memorable Moments in Colorado Sports</h2>
    </div>
      {/* Broncos Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#FB4F14]/50 text-white mt-20">
        <img
          src={broncosBg}
          alt="Denver Broncos banner"
          className="w-full h-[250px] object-cover shadow-amber-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {broncosVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Avalanche Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#236192]/50 text-white mt-20">
        <img
          src={avsBg}
          alt="Colorado Avalanche banner"
          className="w-full h-[250px] object-cover shadow-blue-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {avsVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Nuggets Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#FEC524]/50 text-white mt-20">
        <img
          src={nuggetsBg}
          alt="Denver Nuggets banner"
          className="w-full h-[250px] object-cover shadow-yellow-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nuggetsVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>
      {/* Nuggets Section */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#B0B6BB]/50 text-white mt-20">
        <img
          src={mammothBg}
          alt="Colorado Mammoth banner"
          className="w-full h-[250px] object-cover shadow-red-500/60 shadow-lg"
        />
        <div className="py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mammothVideos.map((v, i) => (
              <VideoEmbed key={i} {...v} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
