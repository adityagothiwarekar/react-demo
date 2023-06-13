import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrain, faLockOpen, faComputer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import './App.css';

library.add(faBrain, faLockOpen, faComputer, faShuffle); // Add this line to import the icons

const cardData = [
  {
    title: 'education',
    description: 'Drive sustainable development in India by enhancing education access through e-learning platforms and literacy initiatives.',
    icon: faUserGraduate,
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

const App = () => {
  const events = [
    {
      tipo: "Registration",
      nome: "24TH July - 25TH August",
      content: (
        <>
          <p>You can register youself by visiting Devfolio Platform</p>
        </>
      )
    },
    {
      tipo: "Idea Submission",
      nome: "1ST September",
      content: (
        <>
          <p>Ideation round Starts</p>
        </>
      )
    },
    {
      tipo: "Round 1 result",
      nome: "10TH September",
      content: (
        <>
          <p>deation round results will be announced</p>.
        </>
      )
    },
    {
      tipo: "Problem statement disclosure ",
      nome: "15th September",
      content: (
        <>
          <p>Problem statement will be revealed</p>
        </>
      )
    },
    {
      tipo: "Hackathon",
      nome: " DAY 1",
      content: (
      <>
          <p>Reporting: 8 am</p>
      <p>Inauguration: 9 am</p>
      <p>Disclosure of preference wise problem statement allotment:10:45 am</p>
      <p>Coding starts at: 11:00 am</p>
      <p>Lunch: 1:00 pm</p>
      <p>Mentoring Round 1: 4:00 pm</p>
      <p>Tea break: 5:30 pm</p>
      <p>Mentoring Round 2: 9:00 pm</p>
      <p>Dinner: 9:30 pm</p>
     </>
      
      )
    },
    {
      tipo: "Hackathon",
      nome: " DAY 2",
      content: (
      <>
          <p>Snacks break : 01:00 am </p>
      <p>	Breakfast : 09:00 am</p>
      <p>Coding ends : 11:00 am</p>
      <p>Submission ends on Devfolio : 11:15 am</p>
      <p>	Closing Ceremony : 5:00 pm</p>
     </>
      
      )
    },
    // Add more events as needed
  ];

  const isBrowser = typeof window !== `undefined`;

  const getScrollPosition = ({ element, useWindow }) => {
    if (!isBrowser) return { x: 0, y: 0 };

    const target = element ? element.current : document.body;
    const position = target.getBoundingClientRect();

    return useWindow
      ? { x: window.scrollX, y: window.scrollY }
      : { x: position.left, y: position.top };
  };

  const useScrollPosition = (effect, deps, element, useWindow, wait) => {
    const position = React.useRef(getScrollPosition({ useWindow }));

    let throttleTimeout = null;

    const callBack = () => {
      const currPos = getScrollPosition({ element, useWindow });
      effect({ prevPos: position.current, currPos });
      position.current = currPos;
      throttleTimeout = null;
    };

    React.useLayoutEffect(() => {
      const handleScroll = () => {
        if (wait) {
          if (throttleTimeout === null) {
            throttleTimeout = setTimeout(callBack, wait);
          }
        } else {
          callBack();
        }
      };

      // add for reflow or reposition on resize or scroll
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }, deps);
  };

  // Event Item
  const EventItem = (props) => {
    const timeItem = React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);

    const checkElement = (el) => {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    React.useEffect(() => {
      setIsVisible(checkElement(timeItem.current));
    }, []);

    useScrollPosition(({ currPos }) => {
      setIsVisible(checkElement(timeItem.current));
    });

    const { content, tipo, nome } = props;
    return (
      <li ref={timeItem} className={isVisible ? "inView" : null}>
        <div>
          <h4 className="title">{tipo}</h4>
          <h3 className="nome">{nome}</h3>
          <p className="description">{content}</p>
        </div>
      </li>
    );
  };

  // Timeline
  const Timeline = () => {
    const scrollArea = React.useRef();

    const makeTimeline = (events) => {
      return events.map((item, index) => (
        <EventItem
          content={item.content}
          tipo={item.tipo}
          nome={item.nome}
          key={index}
        />
      ));
    };

    return (
      <div className="wrapper" ref={scrollArea}>
        <section className="header">
          <div className="container">
            <h1>
            <FontAwesomeIcon
          icon={ faClock }
          className="header-icon"
          beat
          style={{ textShadow: '4px 4px 8px black' }}
        />{' '}Timeline</h1>
          </div>
        </section>

        <section className="timeline">
          <ul>{makeTimeline(events)}</ul>
        </section>
      </div>
    );
  };

  return (
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
            icon={card.icon}
          />
        ))}
      </div>
      <Timeline />
    </div>
  );
};

export default App;

