import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import back from './back.png';
import Home from '../home';
import axios from 'axios';

function App() {
  const [offHome, setOffHome] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const patientData = await axios.get(`http://localhost:3001/data`)
        console.log("get", patientData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  //main landing page, 2 buttons to click to histogram and then graph (both full page elements on diff routes)
  //make axios call here, pass state down to children
  return (
    <Router>
      <div className="App">
        <div className="header">
          <img alt="" src={"https://seamless.md/wp-content/uploads/2019/03/Artboard-1@4x-166x37.png"}></img>
          {offHome && <Link to="/"><img alt="" src={back}></img>Back</Link>}
        </div>
        <Switch>
          {/* <Route path='/histogram' render={(props) => <Histogram {...props} setOffHome={setOffHome}/>} />
          <Route path='/table' render={(props) => <Table {...props} setOffHome={setOffHome}/>} />
          <Route path='/stats' render={(props) => <Stats {...props} setOffHome={setOffHome}/>} /> */}
          <Route path='/' render={(props) => <Home {...props} />} setOffHome={setOffHome}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
