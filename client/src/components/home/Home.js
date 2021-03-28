import './Home.css';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Home(props) {
  const [redirect, setRedirect] = useState(false);
  const [redirectLocation, setRedirectLocation] = useState('/stats');

  useEffect(() => {
    props.setOffHome(state => "home-link");
  }, []);

  function navigate(location) {
    setRedirectLocation(state => location);
    setRedirect(state => true);
  }

  return (
    <div className="main-container">
      {redirect ? <Redirect to={redirectLocation} /> : null}
      <div className="home-container">
        <div onClick={() => navigate("/stats")} className="home-button">
          <span>Statistics</span>
        </div>
        <div onClick={() => navigate("/histogram")} className="home-button">
          <span>Histogram</span>
        </div>
        <div onClick={() => navigate("/table")} className="home-button">
          <span>Table</span>
        </div>
      </div>
    </div>
  )
}
