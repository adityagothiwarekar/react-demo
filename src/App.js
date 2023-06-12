import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrain, faLockOpen, faComputer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';

import './App.css';

library.add(faBrain, faLockOpen, faComputer, faShuffle); // Add this line to import the icons

const cardData = [
  {
    title: 'education',
    description: 'Drive sustainable development in India by enhancing education access through e-learning platforms and literacy initiatives.',
    icon: faUserGraduate ,
    backgroundImage: '/Imagaes/education.9426ff7f74d1d906c8d2.png',
  },
  {
    title: 'finance',
    description: 'Leverage Fintech for inclusive finance, break barriers & drive growth in India for all socio-economic levels.',
    icon: faCoins,
    backgroundImage: '/Imagaes/fintech.ccdf42e0e317b636c339.png',
  },
  {
    title: 'sustainability',
    description: 'Create climate solutions in India for sustainability - tech for carbon reduction & adaptation strategies to combat climate change.',
    icon: faPagelines,
    backgroundImage: '/Imagaes/climate.8399f9c7c7ef9bcda0c6.png',
  },
];

const Card = ({ title, description, backgroundImage, icon }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => {
    setIsFlipped(true);
  };

  const handleHoverEnd = () => {
    setIsFlipped(false);
  };

  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <div className="card-inner">
        <div className="icon-container">
          <FontAwesomeIcon
            icon={icon}
            className="card-icon"
            beat
            size="4x"
            color="white"
            style={{ textShadow: '2px 2px 4px black' }}
          />
        </div>
        <div className="card-front" style={cardStyle}>
          <h2 className="card-title">{title}</h2>
          <div className="button-container">
            <button className="view-more-button">View More</button>
          </div>
        </div>
        <div className="card-back">
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};


const App = () => (
  <div className="App">
    <h1 className="App-header">
      <FontAwesomeIcon
        icon={faShuffle}
        className="header-icon"
        flip
        style={{ textShadow: '4px 4px 8px black' }}
      />{' '}
      <span className="header-text">Tracks</span>
    </h1>
    <div className="card-container">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          backgroundImage={card.backgroundImage}
          icon={card.icon} // Add this line to pass the icon prop to the Card component
        />
      ))}
    </div>
  </div>
);

export default App;
