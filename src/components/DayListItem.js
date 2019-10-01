import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind"
import { format } from "path";

export default function DayListItem(props) {
  function formatSpots(spots) {
    if(spots > 1) {
      return `${spots} spots remaining`
    } else if (spots === 1) {
      return `${spots} spot remaining`
    } else if (spots < 1) {
      return "no spots remaining"
    }
  }
  
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

