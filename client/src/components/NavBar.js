import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.ul `
    display: flex;
    justify-content: center;
    padding-top: 10px;
    
`

const List = styled.li `
    display: inline;
    margin: 0 2%;
    animation: 1s ease forwards fade-in;
    font-size: 1rem;
    font-weight: 700;

    @keyframes fade-in {
        0% {opacity: 0; transfrom: translateY(-10px);}
        100% {opacity: 1; transform: translateY(10px);}

    }

    @media only screen and (max-width: 999px) {
        font-size: 0.7rem;
    }
`

const NavBorder = styled.hr `
    animation: 1s ease forwards extension;
    animation-delay: 0.5s;
    margin: 25px auto;
    opacity: 0;

    @keyframes extension {
        0% { opacity: 0; width: 0%; }
        100% { opacity: 1; width: 62%; max-width: 800px; min-width: 200px;}
    }
`

const linkStyle = {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.7)'
}

export default function NavBar() {


    return (
        <div>
            <Nav>
                <List>
                    <Link to="/" className="link" style={linkStyle}>HOME</Link>
                </List>
                <List>
                    <Link to="/add" className="link" style={linkStyle}>ADD ACTIVITY</Link>
                </List>
                <List>
                    <Link to="/user" className="link" style={linkStyle}>ADD USER</Link>
                </List>
            </Nav>
            <NavBorder></NavBorder>
        </div>
    )
}
