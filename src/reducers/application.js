import React, { useEffect, useReducer } from "react";

import axios from 'axios'


export function reducer(state, action) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

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