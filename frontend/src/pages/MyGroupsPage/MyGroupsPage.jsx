import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import MyGroups from '../../components/MyGroups/MyGroups';

const MyGroupsPage = () => {
    return ( 
        <div>
            <div>
                <MyGroups />
            </div>
        </div>
     );
}
 
export default MyGroupsPage ;