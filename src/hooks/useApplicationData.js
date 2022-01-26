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


  function  bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {id, interview})
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
    return axios.delete(`/api/appointments/${id}`)
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