import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Index = () => {
  return (
    <div>
      <div className="grid-container">
        <div id="container" className="box-grid">
          <div className="box">
            <Link to="/skus">Copilot Business vs Enterprise</Link>
          </div>
          <div className="box">
            <Link to="/game-landscape">Levels of Enlightenment</Link>
          </div>
          <div className="box">
            <Link to="/tutorials">Tutorials</Link>
          </div>
          <div className="box">
            <img src="2f8fc057-cb77-46af-8739-09295749e790.jfif" alt="Logo of a pilot with a headset and a leather jacket" style={{ width: '100px', height: 'auto' }} />
          </div>
        </div>
      </div>
      <div id="copilot-news">
        <h2>Copilot News</h2>
        <div id="filter-buttons"></div>
        <div id="news-content"></div>
      </div>
    </div>
  );
};

export default Index;
