import React, { useState, useEffect } from "react";

import axios from 'axios'

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      day: "",
      days: [],
      appointments: {
        "1": {
          id: 1,
          time: "12pm",
          interview: null
        }
      },
      interviewers: {}
    }
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

  function bookInterview(id, interview) {

    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      console.log("THIS IS THE RESPONSE", response)
      setState({...state, appointments})
      return "SUCCESS"
    }).catch((error) => {
      console.log(error)
      return "ERROR"
    }) 
  }

  function cancelInterview(id) {
    console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      console.log("THIS IS THE RESPONSE", response)
      setState({...state, appointments})
      return "SUCCESS"
    }).catch((error) => {
      return "ERROR"
    })
  }


  return { state, setDay, bookInterview, cancelInterview };

}