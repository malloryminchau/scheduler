import React, { useState, useEffect } from "react";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index.js"
import axios from 'axios'
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors.js'
import { useApplicationData } from "../hooks/useApplicationData.js"

import "components/Application.scss";

export default function Application(props) {
  const {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // console.log("THIS IS THE STATE", state)
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
     const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
          spots={state.day.spots}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
