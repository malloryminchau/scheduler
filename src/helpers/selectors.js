export function getAppointmentsForDay(state, day) {
  let dayAppointments = []
  const filteredDay = state.days.filter(days => days.name === day)
  // console.log("appointment filtered days", filteredDay)
  if(filteredDay.length > 0) {
    dayAppointments = filteredDay[0].appointments
    let appointmentObject = []
    for(let element of dayAppointments) {
      appointmentObject.push(state.appointments[element])
    }
    return appointmentObject
  } else {
    return filteredDay
  }
}

export function getInterview(state, interview) {
  let interviews = {}
  let instructorid = ""
  // console.log("TEST data", state.interviewers)
  if (interview === null) {
    return null
  } else {
    instructorid = interview.interviewer
    // console.log(instructorid)
    interviews.student = interview.student
    interviews.interviewer = state.interviewers[instructorid]
    // console.log(interviews)
    return interviews
  }
}

export function getInterviewersForDay(state, day) {
  // console.log("TEST STATE", state)
  let dayInterviews = []
  const filteredDay = state.days.filter(days => days.name === day)
  // console.log("FILTERED", filteredDay)
  if(filteredDay.length > 0) {
    dayInterviews = filteredDay[0].interviewers
    // console.log("interview id array", dayInterviews)
    let interviewObject = []
    for(let element of dayInterviews) {
      interviewObject.push(state.interviewers[element])
    }
    return interviewObject
  } else {
    return filteredDay
  }
}