import React, { Fragment } from 'react'
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from 'hooks/useVisualMode';
import Form from "components/Appointment/Form.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  


    return (
      <Fragment>
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => {
          transition(CREATE)
        }} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        )}
        {mode === CREATE && (
          <Form
          interviewers={props.interviewers}
          onCancel={() => {
            transition(EMPTY)
          }}
          />
        )}
      </Fragment>
      
    )
  

  
}

