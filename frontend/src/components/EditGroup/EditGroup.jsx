import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const EditGroup = () => {
    const [group , token] = useAuth()
    const [editedGroupInfo, setEditedGroupInfo] = useState({
        bio: group.bio,
        meeting_time: group.meeting_time,
        meeting_day: group.meeting_day
    });

    const handleGroupInfoChange = (event) => {
        setEditedGroupInfo({
            ...editedGroupInfo,
            [event.target.name]: event.target.value
        });
    };

    const updateGroup = async (groupId) => {
        try {
            let response = await axios.put(
                `http://127.0.0.1:5000/api/groups_by_id/${groupId}`,
                editedGroupInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            console.log("Error in updateGroup", error)
        }
    }

    const updateGroupInfo = () => {
        const groupId = prompt("Please enter the Id of the group you want to edit.")
        updateGroup(groupId)
    }

    return (
        <div>
            <form onSubmit={updateGroupInfo}>
                <input type='text' name='bio' placeholder='Bio' value={editedGroupInfo.bio} onChange={handleGroupInfoChange} />
                <input type='text' name='meeting_time' placeholder='Meeting Time HH:MM' value={editedGroupInfo.meeting_time} onChange={handleGroupInfoChange} />
                <input type='text' name='meeting_day' placeholder='Metting Day YYYY-MM-DD' value={editedGroupInfo.meeting_day} onChange={handleGroupInfoChange} />
                <button type='submit'>Update Group!</button>
            </form>
        </div>
    );

}

export default EditGroup;