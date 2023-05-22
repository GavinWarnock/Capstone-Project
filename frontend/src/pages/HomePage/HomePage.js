import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);

  const fetchUserEvents = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/users/${user.id}`
      )
      console.log(response.data.groups)
      setEvents(response.data.groups)
    } catch (error) {
      console.log("Error in fetchUserEvents", error)
    }
  }

  useEffect(() => {
    fetchUserEvents();
}, []);

  const mappedEvents = events.map(group => ({
      title: group.name,
      date: group.meeting_day
  }));


  return (
    <>
      <div className="container">
      <h1>Home Page for {user.username}!</h1>
      </div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={mappedEvents} />
      
        {console.log(user)}
        
      
    </>
  );
};

export default HomePage;
