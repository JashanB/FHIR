import './Stats.css';
import { useState, useEffect } from 'react';

export default function Stats(props) {
  const [patientAges, setPatientAges] = useState([]);
  const [paeds, setPaeds] = useState(0);
  const [numMale, setNumMale] = useState(0);
  const [numFemale, setNumFemale] = useState(0);
  const [avgAge, setAvgAge] = useState(0);
  const [median, setMedian] = useState(0);

  useEffect(() => {
    props.setOffHome(state => "off-home-link");
  }, []);

  useEffect(() => {
    const ageArray = [];
    let totalAge = 0;
    setNumFemale(state => 0);
    setNumMale(state => 0);
    setPaeds(state => 0);
    for (let i = 0; i < props.patientData.length; i++) {
      const currentPatientAge = props.getNumberAge(props.patientData[i].resource.birthDate);
      if (currentPatientAge < 18) {
        setPaeds(state => state + 1);
      }
      if (props.patientData[i].resource.gender === "female") {
        setNumFemale(state => state + 1);
      } else if (props.patientData[i].resource.gender === "male") {
        setNumMale(state => state + 1);
      }
      ageArray.push(currentPatientAge);
      totalAge += currentPatientAge;
    }
    setPatientAges(state => ageArray);
    setAvgAge(state => (totalAge / ageArray.length));
  }, [props.patientData]);

  useEffect(() => {
    if (patientAges.length > 0) {
      let middleValue = 0;
      if (Math.round(patientAges.length / 2) % 2 === 0) {
        middleValue = (patientAges[patientAges.length / 2] + patientAges[(patientAges.length / 2) - 1]) / 2;
      } else {
        middleValue = patientAges[Math.floor(patientAges.length / 2)];
      }
      setMedian(state => middleValue);
    }
  }, [patientAges]);

  return (
    <div className="main-container">
      <div className="stats-container">
        <div className="stats-row">
          <div className="stats-box">
            <span>Number of Patients</span>
            <p>{props.patientData.length}</p>
          </div>
          <div className="stats-box">
            <span>Pediatric Patients</span>
            <p>{paeds}</p>
          </div>
          <div className="stats-box">
            <span>Average Age</span>
            <p>{avgAge} years</p>
          </div>
        </div>
        <div className="stats-row">
          <div className="stats-box">
            <span>Median Age</span>
            <p>{median} years</p>
          </div>
          <div className="stats-box">
            <span>Number of Males</span>
            <p>{numMale}</p>
          </div>
          <div className="stats-box">
            <span>Number of Females</span>
            <p>{numFemale}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
