import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
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
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>
      {groups &&
        groups.map((group) => (
          <p key={group.id}>
            {group.name} {group.bio} {group.player}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
