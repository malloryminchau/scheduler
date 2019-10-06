import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind"
import { format } from "path";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

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
    <li 
    className={dayClass}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

