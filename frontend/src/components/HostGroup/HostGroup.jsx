import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const HostGroup = () => {
    const [ token ] = useAuth();
    const [newGroup, setNewGroup] = useState([]);
    const [newGroupName, setNewGroupName] = useState("")
    const [newGroupBio, setNewGroupBio] = useState("")
    const [newGroupMeetingTime, setNewGroupMeetingTime] = useState("")
    const [newGroupMeetingDate, setNewGroupMeetingDate] = useState("")
    const [newGroupGame, setNewGroupGame] = useState()

    const [isLoading, setIsLoading] = useState(false);
    
    const hostNewGroup = async () => {
        try{
            let response = await axios.post(
                "http://127.0.0.1:5000/api/groups",
                {
                    name: newGroupName,
                    bio: newGroupBio,
                    meeting_time: newGroupMeetingTime,
                    meeting_date: newGroupMeetingDate,
                    game_id: newGroupGame
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setNewGroup(response.data);
            setIsLoading(false)
        } catch (error) {
            console.log("Error in hostNewGroup", error)
        }
    }
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <form>
                        <input type='text' name="name" placeholder='Group Name' value={newGroup.name} />
                        <input type='text' name="bio" placeholder='Bio' value={newGroup.bio} />
                        <input type='text' name="meeting_time" placeholder='Meeting Time HH:MM' value={newGroup.meeting_time}/>
                        <input type='text' name="meeting_date" placeholder='Meeting Date YYYY-MM-DD' value={newGroup.meeting_date}/>
                        <input type='text' name="game_id" placeholder='Game Id' value={newGroup.game_id}/>
                        <button type='submit' onClick={hostNewGroup}>Create Group!</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default HostGroup