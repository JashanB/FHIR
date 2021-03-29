import './Histogram.css';
import { useState, useEffect } from 'react';
import Chart from "react-google-charts";

export default function Histogram(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.setOffHome(state => "off-home-link");
  }, []);

  useEffect(() => {
    const dataArray = [["Age"]];
    for (const item of props.patientData) {
      const age = props.getNumberAge(item.resource.birthDate);
      dataArray.push([age]);
    }
    console.log(dataArray)
    setData(state => dataArray);
  }, [props.patientData])

  return (
    <div className="main-container">
      <div className="histogram-container">
        <Chart
          height={'550px'}
          chartType="Histogram"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            title: 'Age of Patients in Years',
            legend: { position: 'none' },
          }}
          // rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </div>
  );
}
