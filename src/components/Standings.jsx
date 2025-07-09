import React, { useState, useEffect } from 'react';

const Standings = () => {
  const [teamRecords, setTeamRecords] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Ice_Hockey'),
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?l=4391'),
      fetch('https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Basketball'),
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(dataArrays => {
        let newRecords = {};
        dataArrays.forEach((data, index) => {
          if (index === 0) { // Assuming index 0 is for Colorado Avalanche
            newRecords['Colorado Avalanche'] = processAvalancheRecord(data.events);
          } else if (index === 1) { // Assuming index 1 is for Denver Broncos
            newRecords['Denver Broncos'] = processBroncosRecord(data.events);
          } else if (index === 2) { // Assuming index 1 is for Denver Broncos
            newRecords['Denver Nuggets'] = processNuggetsRecord(data.events);
          }
          // Add other teams as needed
        });
        setTeamRecords(newRecords);
      })
      .catch(err => {
        console.error('Error fetching team records:', err);
      });
  }, []);


  
  const processAvalancheRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
             (event.strHomeTeam === 'Colorado Avalanche' || event.strAwayTeam === 'Colorado Avalanche');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };

  const processBroncosRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
             (event.strHomeTeam === 'Denver Broncos' || event.strAwayTeam === 'Denver Broncos');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };
  const processNuggetsRecord = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    return events.filter(event => {
      const eventDate = new Date(event.dateEvent);
      return eventDate.getDate() === today.getDate() &&
        (event.strHomeTeam === 'Denver Nuggets' || event.strAwayTeam === 'Denver Nuggets');
    }).map(event => {
      return {
        date: formatDate(event.dateEvent),
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        homeScore: event.intHomeScore,
        awayScore: event.intAwayScore,
        imageHome: event.strHomeTeamBadge,
        imageAway: event.strAwayTeamBadge
      };
    });
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTeamRecord = (team, records) => {
    if (records.length === 0) {
      return <h3 className='results-block'>There are no games for the {team} today.</h3>;
    }
    return (
      <div>
        {/* <h2>{team}</h2> */}
        {records.map(record => (
          <div key={record.date}>
            <img className='logo-home' src={record.imageHome} alt={`${team} game`} />
            <div className='results-block'>
              {record.homeTeam} <p>{record.homeScore}</p>
            </div>
            <img className='logo-home' src={record.imageAway} alt={`${team} game`} />
            <div className='results-block'>
              {record.awayTeam}<p>{record.awayScore}</p>
            </div>
            <div className='date-block'>
              <h3>{record.date}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {Object.keys(teamRecords).map(team => (
        <div className={`card-standings header-style-home-${team.toLowerCase().replace(' ', '-')} col-md-4`} key={team}>
          <ul className='record-text'>
            {teamRecords[team] ? (
              renderTeamRecord(team, teamRecords[team])
            ) : (
              <p>Loading {team} record...</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Standings;