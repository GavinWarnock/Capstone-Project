import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const EditProfile = () => {
    const [user, token] = useAuth()
    const [editedProfileInfo, setEditedProfileInfo] = useState({
        username: user.username,
        bio: user.bio,
        picture: user.picture,
        game_preference: user.game_preference
    });
  
    const handleInfoChange = (event) => {
        setEditedProfileInfo({
            ...editedProfileInfo,
            [event.target.name]: event.target.value
        });
    };

    const updateProfile = async () => {
        try {
            let response = await axios.put(
            `http://127.0.0.1:5000/api/users/${user.id}`,
            editedProfileInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log("Error in updateProfile", error)
        }
    };

    return ( 
        <div>
            <form onSubmit={updateProfile}>
                <input type='text' name='username' placeholder='Username' value={editedProfileInfo.username} onChange={handleInfoChange} />
                <input type='text' name='bio' placeholder='Bio' value={editedProfileInfo.bio} onChange={handleInfoChange} />
                <input type='text' name='picture' placeholder='Picture' value={editedProfileInfo.picture} onChange={handleInfoChange} />
                <input type='text' name='game_preference' placeholder='Game Preference' value={editedProfileInfo.game_preference} onChange={handleInfoChange} />                
                <button type='submit'>Update Profile!</button>
            </form>
        </div>
     );
}
 
export default EditProfile;