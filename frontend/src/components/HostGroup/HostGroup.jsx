import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const HostGroup = () => {
    const [user, token ] = useAuth();
    const [newGroup, setNewGroup] = useState({
        name: "",
        bio: "",
        meeting_time: "",
        meeting_date: "",
        game: ""

    });
    const [newGroupName, setNewGroupName] = useState("")
    const [newGroupBio, setNewGroupBio] = useState("")
    const [newGroupMeetingTime, setNewGroupMeetingTime] = useState("")
    const [newGroupMeetingDate, setNewGroupMeetingDate] = useState("")
    const [newGroupGame, setNewGroupGame] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    
    const hostNewGroup = async (event) => {
        event.preventDefault();
        try{ 
            let postedObject = {    
                name: newGroupName,
                bio: newGroupBio,
                meeting_time: newGroupMeetingTime,
                meeting_day: newGroupMeetingDate,
                game_id: parseInt(newGroupGame)
            }
            console.log("Example",postedObject)
            let response = await axios.post(
                "http://127.0.0.1:5000/api/groups",
                postedObject,
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
                    <form className='form input'>
                        <input type='text' name="name" placeholder='Group Name' value={newGroupName} onChange={(e)=> setNewGroupName(e.target.value)} />
                        <input type='text' name="bio" placeholder='Bio' value={newGroupBio} onChange={(e)=> setNewGroupBio(e.target.value)}/>
                        <input type='text' name="meeting_time" placeholder='Meeting Time HH:MM' value={newGroupMeetingTime} onChange={(e)=> setNewGroupMeetingTime(e.target.value)}/>
                        <input type='text' name="meeting_date" placeholder='Meeting Date YYYY-MM-DD' value={newGroupMeetingDate} onChange={(e)=> setNewGroupMeetingDate(e.target.value)}/>
                        <input type='text' name="game_id" placeholder='Game Id' value={newGroupGame} onChange={(e)=> setNewGroupGame(e.target.value)}/>
                        <button type='submit' onClick={hostNewGroup}>Create Group!</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default HostGroup