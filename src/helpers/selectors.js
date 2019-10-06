export function getAppointmentsForDay(state, day) {
  let dayAppointments = []
  const filteredDay = state.days.filter(days => days.name === day)
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