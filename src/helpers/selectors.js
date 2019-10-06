export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter(days => days.name === day)
  
  return filteredDay;

}