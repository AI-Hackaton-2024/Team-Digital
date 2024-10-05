import './Navbar.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import user from "../../assets/user.png"

function Navbar(props) {
    const { menu } = props;

    const navigate = useNavigate();

    const openMenu = (route) => {
        navigate(`/${route}`);
    }

    return (
        <div id = "navbar">
            <div id = "navbar-box">
                <div id = "navbar-btns">
                    <div onClick={() => {openMenu("home")}}>
                        <svg style = {{opacity: menu === "home" ? 1 : 0.7}}
                            className={menu === "home" ? "important-svg" : ""} 
                            xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <path d="M32 12L8 32V56H24V40H40V56H56V32L32 12Z" stroke="black" strokeWidth="4" strokeLinejoin="round"/>
                            <path d="M32 12L8 32V56H24V40H40V56H56V32L32 12Z" fill="white"/>
                        </svg>
                    </div>
                    <div onClick={() => {openMenu("chat")}}>
                        <svg style = {{opacity: menu === "chat" ? 1 : 0.7}}  
                            className={menu === "chat" ? "important-svg" : ""} 
                            xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <rect x="8" y="12" width="48" height="36" rx="8" ry="8" stroke="white" strokeWidth="4" fill="white"/>
                            <path d="M8 36L8 52L20 44H56" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="10" stroke="white" strokeWidth="4" fill="white"/>
                            <path d="M44 32C44 30.7 44.1 29.4 44.4 28.1L49.7 26.3L46.7 19.3L41.1 21.6C39.5 20.3 37.7 19.3 36 18.6V12H28V18.6C26.3 19.3 24.5 20.3 22.9 21.6L17.3 19.3L14.3 26.3L19.6 28.1C19.9 29.4 20 30.7 20 32C20 33.3 19.9 34.6 19.6 35.9L14.3 37.7L17.3 44.7L22.9 42.4C24.5 43.7 26.3 44.7 28 45.4V52H36V45.4C37.7 44.7 39.5 43.7 41.1 42.4L46.7 44.7L49.7 37.7L44.4 35.9C44.1 34.6 44 33.3 44 32Z" stroke="white" strokeWidth="4" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <div id = "navbar-profile">
                        <img src = {user}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
