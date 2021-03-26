import './Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  //3 buttons to stats, table, histogram
  // useEffect(() => {
  //   props.setOffHome(state => false);
  // }, [])
  return (
    <div className="main-container">
      <div className="home-container">
        <div className="home-button">
          <span>Statistics</span>
        </div>
        <div className="home-button">
          <span>Histogram</span>
        </div>
        <div className="home-button">
          <span>Table</span>
        </div>
      </div>
    </div>
  )
}
