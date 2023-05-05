import React, { useState } from 'react';
import styled from "styled-components"

const ModalBG = styled.div`
position:fixed;
z-inde:1;
left:0;
top:0;
width:100%;
height:100%;
overflow:auto;
background-color: rgba(0,0,0, .5);
`
const ModalBody = styled.div`
background-color:white;
margin: 30%;
padding:20px
border-radius: 5px;
box-shadow: 0 5px 12px -3px rgba(255,255,255, .3)
width: 50%;
`





const Modal = ({children}) => {
    const [shouldShow, setShouldShow] = useState(false);
    return ( 
        <>
            <button onClick={()=>setShouldShow(true)}>Host a new group!</button>
            {shouldShow && (
                <ModalBG onClick={()=> setShouldShow(false)}>
                    <ModalBody onClick={(e) => e.stopPropagation()}>
                        <button onClick={()=> setShouldShow(false)}>Cancel</button>
                        {children}
                    </ModalBody>
                </ModalBG>
            )}
        </>
     );
}
 
export default Modal