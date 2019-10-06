import React from "react";
import "components/InterviewerListItem.scss";
import className from "classnames/bind"
import { format } from "path";


export default function InterviewerListItem(props) {


  const itemClass = className("interviewers__item", {
    "interviewers__item--selected": props.selected

  })
  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}



  // return (

  //   <li className="interviewers__item">
  //   <img
  //     className="interviewers__item-image"
  //     src= {props.avatar}
  //     alt={props.name}
  //   />
  //     {props.name}
  //   </li>
  // )