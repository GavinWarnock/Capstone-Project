import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import EditProfile from '../../components/EditProfile/EditProfile';
import Modal from '../../components/Modal/modal2';
import EditGroup from '../../components/EditGroup/EditGroup';
import Modal3 from '../../components/Modal3/Modal3';


const ProfilePage = () => {
    const { user, token } = useContext(AuthContext);
    const auth = "Bearer " + token;
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

    const handleDeleteGroup = async (groupId) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:5000/api/groups_by_id/${groupId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setGroups(groups.filter(group => group.id !== groupId));
        } catch (error) {
            console.log("Error in handleDelete:", error)
        }
    }

    const deleteGroup = () => {
        const groupId = prompt("Please enter the Id of the group you want to delete.")
        handleDeleteGroup(groupId)
    }
    
    const handleDeletePlayerFromGroup = async (userId, groupId) => {
        try {
            let response = await axios.delete(
                `http://127.0.0.1:5000/api/admin/${userId}/${groupId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
        } catch (error) {
            console.log("Error in handleDeletePlayerFromGroup:", error)
        }
    }

    const deletePlayerFromGroup = () => {
        const userId = prompt("Please enter the Id of the player you want to remove")
        const groupId = prompt("Please enter the Id of the group you want to remove this player from")
        handleDeletePlayerFromGroup(userId, groupId)
    }
    

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
                            <h3>Game Preference</h3>
                            <p>{userData.game_preference}</p>
                            <div></div>
                            <div>
                                <Modal>
                                    <EditProfile userId={user.id} auth={auth} />
                                </Modal>
                            </div> 
                            <h3>{userData.username}'s Hosted Groups</h3>

                            <div>
                                <ul className=''>
                                    {groups.map((group) => (
                                        <li className='container2' key={group.owner_id}>
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
                                                <div key={group.id}>
                                                    <span>Group Members: {group.attendees.map((attendee) => attendee.username).join(" ")}</span>
                                                </div>
                                        </li>
                                    ))}
                                    <Modal3>
                                        <EditGroup />
                                    </Modal3>
                                </ul>
                                <div className='container'>
                                    <button onClick={deletePlayerFromGroup}>Remove player from group. </button>
                                </div>
                            </div>
                            <button onClick={deleteGroup}>Delete a group.</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ProfilePage