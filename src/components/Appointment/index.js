import React, { Fragment } from 'react'
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"
import useVisualMode from 'hooks/useVisualMode';
import Form from "components/Appointment/Form.js"
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    if (name && interviewer) {
      props.bookInterview(props.id, interview).then((response) => {
        if (response === "ERROR") {
          transition(ERROR_SAVE, true)
        } else {
          transition(SHOW)
        }
      }).catch((error) => {
        console.log("ERROR", error)
        transition(ERROR_SAVE)
      })

  } else {
    transition(ERROR_SAVE, true)
  }
    
  }

  function confirmCancel() {
    transition(CONFIRM)
  }

  function cancelDelete() {
    transition(SHOW)
  }

  function cancel(id) {
    console.log("THIS IS THE CANCEL ID", props.id)
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then((response) => {
      if (response === "ERROR") {
        transition(ERROR_DELETE, true)
      } else {
        transition(EMPTY)
      }
      
    })
  }

  function edit() {
    transition(EDIT)
  }

    return (
        <Fragment>
          <article data-testid="appointment">
          <Header time={props.time}/>
          {mode === EMPTY && 
          <Empty onAdd={() => {
            transition(CREATE)
          }} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              confirmCancel={confirmCancel}
              edit={edit}
            />
          )}
          {mode === CREATE && (
            <Form
            interviewers={props.interviewers}
            onSave={save}          
            cancel={back}
            />
          )}
          {mode === CONFIRM && (
            <Confirm
            cancel={cancel}
            cancelDelete={cancelDelete}
            />
          )}
          {mode === SAVING && (
            <Status
            message={"Saving"}
            />
          )}
          {mode === DELETING && (
            <Status
            message={"Deleting"}
            />
          )}
          {mode === EDIT && (
            <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            cancel={back}
            onSave={save}
            />
          )}
          {mode === ERROR_SAVE && (
            <Error
            cancel={back}
            message={"save"}
            />
          )}
          {mode === ERROR_DELETE && (
            <Error
            cancel={back}
            message={"delete"}
            />
          )}
          </article>
        </Fragment>
      
      
      
    )
  

  
}

