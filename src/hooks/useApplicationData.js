import React, { useEffect, useReducer } from "react";

import axios from 'axios'




export function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, 
          day: action.value }
      case SET_APPLICATION_DATA:
        return { ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data
        }
      case SET_INTERVIEW: {
        return { ...state,
        appointments: action.value,
        days: action.days
        }
      }
        
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
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
      interviewers: {},
      spots: ""
    }
  });
  const setDay = day => dispatch({ type: SET_DAY, value: day })

  let daysURL = '/api/days'
  let appointmentsURL = '/api/appointments'
  let interviewersURL = '/api/interviewers'
  const promise1 = axios.get(daysURL)
  const promise2 = axios.get(appointmentsURL)
  const promise3 = axios.get(interviewersURL)
  useEffect(() =>{
    Promise.all([promise1, promise2, promise3]).then(function(all) {
      dispatch({type: SET_APPLICATION_DATA, value: all})
    })
  }, [])

  function bookInterview(id, interview) {

    // console.log(id, interview);
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
      // console.log("THIS IS THE RESPONSE", response)
      dispatch({type: SET_INTERVIEW, value: appointments, days: spotsRemaining(appointments) })

      

      return "SUCCESS"
    }).catch((error) => {
      console.log(error)
      return "ERROR"
    }) 
  }

  function cancelInterview(id) {
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
      // console.log("THIS IS THE RESPONSE", response)
      dispatch({type: SET_INTERVIEW, value: appointments, days: spotsRemaining(appointments)})
      
      return "SUCCESS"
    }).catch((error) => {
      return "ERROR"
    })
  }
  function spotsRemaining(appointments) {
    return state.days.map(day => {

      let result = 0;
      day.appointments.forEach(id => {
        if(appointments[id].interview === null) {
          result += 1;
        }
      })
    
      return {
        ...day, 
        spots: result
      }
    })
  }


  return { state, setDay, bookInterview, cancelInterview };

}