import './TableItem.css';
import { Link } from 'react-router-dom';

export default function TableItem(props) {
  return (
    <div className="table-row">
      <div className="table-row-1"><span>{props.name}</span></div>
      <div className="table-row-2"><span>{props.birthDate}</span></div>
      <div className="table-row-3"><span>{props.gender}</span></div>
      <div className="table-row-4"><span>{props.country}</span></div>
      <div className="table-row-5"><a target="_blank" href={props.url}>Full url</a></div>
    </div>
  )
}
// key={item.resource.id} 
// name={name}
// birthDate={item.resource.birthDate}
// gender={item.resource.gender}
// url={item.fullUrl}
// country={country}