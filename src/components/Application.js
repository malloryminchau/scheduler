import React, { useState, useEffect } from "react";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js"
import axios from 'axios'
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors.js'
//import getInterview from '../helpers/selectors.js'

import "components/Application.scss";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day })

    let daysURL = '/api/days'
    let appointmentsURL = '/api/appointments'
    let interviewersURL = '/api/interviewers'
    const promise1 = axios.get(daysURL)
    const promise2 = axios.get(appointmentsURL)
    const promise3 = axios.get(interviewersURL)
    useEffect(() =>{
      Promise.all([promise1, promise2, promise3]).then(function(all) {
        setState(prev => ({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
    }, [])


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  console.log("LOOK HERE", interviewers)

  function bookInterview(id, interview) {
    console.log(id, interview);
    // setState({...state, })
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    // console.log("???", interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  })


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
