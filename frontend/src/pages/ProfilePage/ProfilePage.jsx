import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const ProfilePage = () => {
    const { token } = useContext(AuthContext)
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGroups = async () => {
        try {
            let response = await axios.get(
                "http://127.0.0.1:5000/api/groups",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGroups(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error in fetchGroups:", error)
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return(
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>My Groups</h1>
                    <div>
                        <ul>
                            {groups.map((group) => (
                                <li key={group.player_id}>
                                    <span>{group.name}</span>
                                    <div></div>
                                    <span>{group.bio}</span>
                                    <div></div>
                                    <span>{group.meeting_time}</span>
                                    <div></div>
                                    <span>{group.meeting_day}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage