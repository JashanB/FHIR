import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import back from './back.png';
import Home from '../home';
import axios from 'axios';
import Stats from '../stats';

function App() {
  const [offHome, setOffHome] = useState("home-link");
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const patientData = await axios.get(`http://localhost:3001/data`);
        const object = JSON.parse(patientData.data.data);
        setPatientData(state => object.entry);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])

  function getNumberAge(string) {
    const number = string.split("-")[0];
    const date = new Date();
    const currentYear = date.getFullYear();
    const age = parseInt(currentYear) - parseInt(number);
    return age;
  }
  // console.log(patientData.length)
  //main landing page, 2 buttons to click to histogram and then graph (both full page elements on diff routes)
  //make axios call here, pass state down to children
  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="header-content">
            <img alt="" src={"https://seamless.md/wp-content/uploads/2019/03/Artboard-1@4x-166x37.png"}></img>
            <Link className={offHome} to="/"><img className="header-img" alt="" src={back}></img>Back</Link>
          </div>
        </div>
        <Switch>
          {/* <Route path='/histogram' render={(props) => <Histogram {...props} setOffHome={setOffHome}/>} />
          <Route path='/table' render={(props) => <Table {...props} setOffHome={setOffHome}/>} /> */}
          <Route path='/stats' render={(props) => <Stats {...props} setOffHome={setOffHome} getNumberAge={getNumberAge} patientData={patientData} />} />
          <Route path='/' render={(props) => <Home {...props} setOffHome={setOffHome} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
