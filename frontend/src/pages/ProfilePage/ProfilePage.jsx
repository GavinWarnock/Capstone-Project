import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import EditProfile from '../../components/EditProfile/EditProfile';
import Modal from '../../components/Modal/modal2';



const ProfilePage = () => {
    const { user, token } = useContext(AuthContext);
    const auth = "Bearer" + token;
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
                            <p>Game Preference: {userData.game_preference}</p>
                            <div></div>
                            <div>
                                <Modal>
                                    <EditProfile userId={user.id} auth={auth} />
                                </Modal>
                            </div> 
                            <h3>{userData.username}'s Hosted Groups</h3>

                            <div>
                                <ul>
                                    {groups.map((group) => (
                                        <li key={group.owner_id}>
                                            <span>Group Name: {group.name}</span>
                                            <div>Group Id: {group.id}</div>
                                            <div></div>
                                            <span>Group Bio: {group.bio}</span>
                                            <div></div>
                                            <span>Meeting Time: {group.meeting_time}</span>
                                            <div></div>
                                            <span>Meeting Date: {group.meeting_day}</span>
                                            <div></div>
                                            <span>Game: {group.game.name}</span>
                                            <div></div>
                                            <span>Group Members: {group.attendees.name}</span>
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