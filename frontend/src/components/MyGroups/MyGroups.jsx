
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyGroups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:5000/api/groups",
                )
                setGroups(response.data);
            } catch (error) {
                console.log("Error in fetchGroups", error)
            }
        fetchGroups();
        }
    })

    return (
        <div>
            <h1>My Groups</h1>
            <div>
                <ul>
                    {groups.map((attendee) => (
                        <li key={groups.id}>
                            <h2>{groups.name}</h2>
                            <p>{groups.bio}</p>
                            <p>Attendees: {attendee.username}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
         
     );
}
 
export default MyGroups;