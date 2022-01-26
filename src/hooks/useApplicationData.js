import { useState, useEffect} from "react";
import axios from "axios";

export  function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
    
  });

  //function that updates spots remaining after save action
  const updateSpotsOnSave = (appointment, id) => {
    if (
      state.appointments[id].interview === null &&
      appointment.interview !== null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots--;
    }
  };

  //function that updates spots remaining after delete action
  const updateSpotsOnDelete = (appointment, id) => {
    if (
      state.appointments[id].interview !== null &&
      appointment.interview === null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots++;
    }
  };


  function  bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    updateSpotsOnSave(appointment, id);

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    });
   
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    updateSpotsOnDelete(appointment, id)

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    });
  }
 

   

  const setDay = day => setState({ ...state, day });

  

  
  useEffect(() => {
    Promise.all([
   axios.get("http://localhost:8001/api/days"),
   axios.get("http://localhost:8001/api/appointments"),
   axios.get("http://localhost:8001/api/interviewers")
  ]).then((all)=> {
    console.log('response',all)
    const [days, appointments, interviewers] = all;
    setState(prev => ({
      ...prev,
      days: days.data,
      appointments: appointments.data,
      interviewers: interviewers.data
    }));
  });
}, []);

return { state, setDay, bookInterview, cancelInterview };

}