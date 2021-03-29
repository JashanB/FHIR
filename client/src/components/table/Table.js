import './Table.css';
import { useState, useEffect } from 'react';
import TableItem from './tableItem';

export default function Table({getNumberAge, setOffHome, patientData }) {
  const [displayData, setDisplayData] = useState([]);
  const [reverse, setReverse] = useState("start");
  const [sortButtons, setSortButtons] = useState(["button-selected", "button"]);
  const [under, setUnder] = useState(false);
  const [over, setOver] = useState(false);
  const [all, setAll] = useState(true);
  const [ageButtons, setAgeButtons] = useState(["button-selected", "button", "button"]);
  
  useEffect(() => {
    setOffHome(state => "off-home-link");
  }, [setOffHome]);

  function compare(a,b) {
    if (getNumberAge(a.resource.birthDate) < getNumberAge(b.resource.birthDate)) {
      return -1; 
    }
    if (getNumberAge(a.resource.birthDate) > getNumberAge(b.resource.birthDate)) {
      return 1; 
    }
    return 0;
  }
console.log(reverse)
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

  function sortAscending () {
    setReverse(state => true);
    setSortButtons(state => ["button", "button-selected"]);
  }

  function sortDescending () {
    setReverse(state => false);
    setSortButtons(state => ["button-selected", "button"]);  
  }

  useEffect(() => {
    if (under) {
      const underItems = patientData.filter(function(item) {
        if (getNumberAge(item.resource.birthDate) < 18) {
          return item;
        }
      })
      reverse ? setDisplayData(state => underItems.sort(compare)) : setDisplayData(state => underItems.sort(compare).reverse());
    }
    if (over) {
      const overItems = patientData.filter(function(item) {
        if (getNumberAge(item.resource.birthDate) >= 18) {
          return item;
        }
      })
      reverse ? setDisplayData(state => overItems.sort(compare)) : setDisplayData(state => overItems.sort(compare).reverse());
    }
    if (all) {
      reverse ? setDisplayData(state => patientData.sort(compare).reverse()) : setDisplayData(state => patientData.sort(compare));
    }
  }, [under, over, all, patientData, reverse]);

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
          <div onClick={() => sortDescending()} className={sortButtons[0]}><span>Age Descending</span></div>
          <div onClick={() => sortAscending()} className={sortButtons[1]}><span>Age Ascending</span></div>
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
