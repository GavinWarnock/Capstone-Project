import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const GroupDetailPage =  () => {
    const { groupId } = useParams();
    const [groupDetails, setGroupDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const { token } = useContext(AuthContext);

    const fetchGroupDetails = async () => {
        try {
            let response = await axios.get(
                `http://127.0.0.1:5000//api/groups_by_id/${groupId}`
            );
            setGroupDetails(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error in fetchBooksDetails:", error);
        }
    }

    const joinGroup = async () => {
        try {
            if (isJoined) {
                await axios.put(
                    `http://127.0.0.1:5000/api/join_groups/${groupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsJoined(false);
            } else {
                await axios.put(
                    `http://127.0.0.1:5000/api/join_groups/${groupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsJoined(true);
            }
        } catch (error) {
            console.log("Error in joinGroup", error)
        }
    };

    useEffect(() => {
        const checkJoin = async () => {
            try {
                let response = await axios.get(
                    `http://127.0.0.1:5000//api/groups_by_id/${groupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsJoined(true);
            } catch (error) {
                setIsJoined(false);
            }
        };
        fetchGroupDetails();
        checkJoin();
        }, []);

    return(
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>
                        <h2>Group Name: {groupDetails.name}</h2>
                        <div>
                            <h3>Group Bio: {groupDetails.bio}</h3>
                            <div>
                                <h4>Attendees: </h4>
                                <ul>
                                    {groupDetails.attendees.map((attendee) =>
                                    <li>{attendee.username}</li>
                                    )}
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default GroupDetailPage