import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/groups", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchGroups();
  }, [token]);

  return (
    <>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      <div className="container">
        {console.log(user)}
        <h1>Home Page for {user.username}!</h1>
      </div>
    </>
  );
};

export default HomePage;
