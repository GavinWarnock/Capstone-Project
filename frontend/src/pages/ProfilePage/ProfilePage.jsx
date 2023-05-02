import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';



const ProfilePage = () => {
    const { user, token } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null)

    const fetchUserData = async () => {
        try {
            let response = await axios.get(
                `http://127.0.0.1:5000/api/users/${user.id}`,
            

            )
            setUserData(response.data);
            setIsLoading(false)
        } catch (error) {
            console.log("Error in fetchUserData", error)
        }
    }
    useEffect(() => {
        fetchUserData();
    },  []);

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
                    <div>
                        <h2>Welcome {userData.username}</h2>
                        <div>
                            <h3>About Me</h3>
                            <p>{userData.bio}</p>
                            <h3>{userData.username}'s Groups</h3>
                            <div>
                                <ul>
                                    {groups.map((group) => (
                                        <li key={group.owner_id}>
                                            <span>{group.name}</span>
                                            <div></div>
                                            <span>{group.bio}</span>
                                            <div></div>
                                            <span>{group.meeting_time}</span>
                                            <div></div>
                                            <span>{group.meeting_day}</span>
                                            <div></div>
                                            <span>{group.game.name}</span>
                                            <div></div>
                                            <span>{group.attendees}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage