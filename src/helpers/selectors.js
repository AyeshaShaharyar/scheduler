export function getAppointmentsForDay(state, day) {
  const numOfAppointments = [];
  const filteredDays = state.days.filter(dayArr => dayArr.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentsArr = filteredDays[0].appointments;
  appointmentsArr.forEach(element => numOfAppointments.push(state.appointments[element]))
  // console.log(numOfAppointments);
  return numOfAppointments;

}

// return obj if passed in an obj that contains interviewer
export function getInterview(state, interview) {
  if (interview === null || !interview) {
    return null;
  }

  for (const interviewer of Object.values(state.interviewers)) {
    if (interview.interviewer === interviewer.id) {
      return { student: interview.student, interviewer: interviewer };
    }
  }
}

