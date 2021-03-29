import './Table.css';
import { useState, useEffect } from 'react';
import TableItem from './tableItem';

export default function Table(props) {
  const [displayData, setDisplayData] = useState([]);
  const [reverse, setReverse] = useState(true);
  const [sortButtons, setSortButtons] = useState(["button-selected", "button"]);
  const [under, setUnder] = useState(false);
  const [over, setOver] = useState(false);
  const [all, setAll] = useState(true);
  const [ageButtons, setAgeButtons] = useState(["button-selected", "button", "button"]);
  
  useEffect(() => {
    props.setOffHome(state => "off-home-link");
  }, []);

  function compare(a,b) {
    let num = 0;
    if (props.getNumberAge(a.resource.birthDate) < props.getNumberAge(b.resource.birthDate)) {
      reverse ? num = 1 : num = -1; 
    }
    if (props.getNumberAge(a.resource.birthDate) > props.getNumberAge(b.resource.birthDate)) {
      reverse ? num = -1 : num = 1; 
    }
    return num;
  }

  function ageButtonClick(index) {
    if (index === 0) {
      setAgeButtons(state => ["button-selected", "button", "button"]);
      setAll(state => true);
      setUnder(state => false);
      setOver(state => false);
    } else if (index === 1) {
      setAgeButtons(state => ["button", "button-selected", "button"]);
      setAll(state => false);
      setUnder(state => true);
      setOver(state => false);
    } else if (index === 2) {
      setAgeButtons(state => ["button", "button", "button-selected"]);
      setAll(state => false);
      setUnder(state => false);
      setOver(state => true);
    }
  }

  function sortButtonClicked(index) {
    reverse ? setReverse(state => false) : setReverse(state => true);
    if (index === 0) {
      setSortButtons(state => ["button-selected", "button"]);
    } else if (index === 1) {
      setSortButtons(state => ["button", "button-selected"]);
    }
  }
  // useEffect(() => {
  //   const sortedData = props.patientData.sort(compare);
  //   setDisplayData(state => sortedData);
  // }, [props.patientData, reverse])

  useEffect(() => {
    if (under) {
      const underItems = props.patientData.filter(function(item) {
        if (props.getNumberAge(item.resource.birthDate) < 18) {
          return item;
        }
      })
      const sortedUnder = underItems.sort(compare);
      setDisplayData(state => sortedUnder);
    }
    if (over) {
      const overItems = props.patientData.filter(function(item) {
        if (props.getNumberAge(item.resource.birthDate) >= 18) {
          return item;
        }
      })
      const sortedOver = overItems.sort(compare);
      setDisplayData(state => sortedOver);
    }
    if (all) {
      const sortedData = props.patientData.sort(compare);
      setDisplayData(state => sortedData);
    }
  }, [under, over, all, reverse, props.patientData]);

  //buttons: date asc/desc
  //filters: <18, >18, m/f
  const tableRows = displayData.map(function (item) {
    if (displayData.length > 0) {
      let name = ""
      let country = ""
      if (item.resource.name && item.resource.name[0] && item.resource.name[0].text) {
        name = item.resource.name[0].text
      } else if (item.resource.name && item.resource.name[0] && item.resource.name[0].family) {
        name = item.resource.name[0].family
      } else if (item.resource.name && item.resource.name[0] && item.resource.name[0].given) {
        name = item.resource.name[0].given[0]
      }
      if (item.resource.address && item.resource.address[0].country) {
        country = item.resource.address[0].country;
      }
      return (
        <TableItem
          key={item.resource.id}
          name={name}
          birthDate={item.resource.birthDate}
          gender={item.resource.gender}
          url={item.fullUrl}
          country={country}
        />
      )
    }
  })

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="buttons-row">
          <div onClick={() => sortButtonClicked(0)} className={sortButtons[0]}><span>Age Descending</span></div>
          <div onClick={() => sortButtonClicked(1)} className={sortButtons[1]}><span>Age Ascending</span></div>
        </div>
        <div className="buttons-row">
          <div onClick={() => ageButtonClick(0)} className={ageButtons[0]}><span>All Ages</span></div>
          <div onClick={() => ageButtonClick(1)} className={ageButtons[1]}><span>Pediatric</span></div>
          <div onClick={() => ageButtonClick(2)} className={ageButtons[2]}><span>Adult</span></div>
        </div>
        <div className="table-header">
          <div className="header-1"><span>Name</span></div>
          <div className="header-2"><span>Birth Date</span></div>
          <div className="header-3"><span>Gender</span></div>
          <div className="header-4"><span>Country</span></div>
          <div className="header-5"><span>Url</span></div>
        </div>
        {tableRows}
      </div>
    </div>
  );
}
