import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Nav = styled.nav `
display: flex;
justify-content: flex-end;
align-items: center;
padding: 30px;
position: relative;
border-bottom: 2px solid red;


a{
    display: flex;
    padding: 0 20px;
    text-decoration: none;
    justify-content: flex-end;
    font-weight: bold;
    color: black;
    :hover{
        color: #0066cc;
    }
}
h4{
    position: absolute;
    left: 10px;
    padding: 10px

}
span{
    font-size: 30px;
    color: red;
    padding: 0 15px;
}
`;

const HelperNav =()=>{
    return(
        
        <Nav>
            <h4><span>Q</span>Dev Desk</h4>
            <Link to={`/student_dashboard`}>For Students</Link>
            <Link to={`/login`}>Login</Link>
        </Nav>
    )
}
export default HelperNav