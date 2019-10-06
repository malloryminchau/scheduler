import React, { Fragment } from 'react'
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"

export default function Appointment(props) {

  if(props.interview) {
    return (
      <Fragment>
        <Header time={props.time}/>
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/>
      </Fragment>
      
    )
  } else {
    return (
      <Fragment>
        <Header time={props.time}/>
        <Empty /> 
      </Fragment>
      
    )
  }

  
}

