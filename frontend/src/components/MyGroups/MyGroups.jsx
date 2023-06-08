import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const MyGroups = () => {
  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroupData = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:5000/api/users/${user.id}`);
      
      
      setUserData(response.data);
      setIsLoading(false) 
    
    } catch (error) {
      console.log("Error in fetchGroupData", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <div>
        {isLoading ? (
         <div>
            Loading...
        </div>
        ) : (
            <div>
            {console.log(userData)}
            <h3>My Groups:</h3>
         <div>
        {userData.groups.map((group) => (
        <div className='container3' key={group.id}>
            {group.name}
            <div>
                {group.bio}
            </div>
            <div>
                {group.game.name}
            </div>
            <div>
                {group.meeting_time}
            </div>
            <div>
                {group.meeting_day}
            </div>
        </div>
        ))}
      </div>
    </div>    
        )}
    </div>   
  );
};

export default MyGroups;

 