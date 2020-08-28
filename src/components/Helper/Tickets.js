import React, { useState, useEffect } from 'react';
// import data from './HelperData';
import styled from 'styled-components';
import {axiosAuth }from '../utils/axiosAuth'

const TicketDiv = styled.div `
    background-color: #0066cc;
    
    // display: flex;
    // flex-direction: column;
    // align-items:center;
    // padding: 10px 0;

`;

const StudentTicket = ()=>{
    const [studentTick, setStudentTick]= useState([]);
    useEffect(()=>{
        const getTix = ()=>{
            axiosAuth()
            .get('/api/tickets')
            .then(res=>{
                //console.log(res)
                setStudentTick(res.data);
                
            })
            .catch(error => {
                console.error('Error', error);
              });
        }
        getTix();
    },[]);

    return (
        <div>
            {studentTick.map((item)=>(
            <TicketDiv>   
                <h2>{item.title}</h2>
                    <p>Description: {item.description}</p>
                    <p>Category: {item.categories}</p>
                    <p>Attempt to solve: {item.what_ive_tried}</p>
                    <p>Ticket assigned to: {item.ticketAssigned}</p>
                    <button>Help Student</button>
                    <button>Resolved</button>
                    <button>Release</button>
            </TicketDiv>
           ))}
        </div>
    )
}
export default StudentTicket