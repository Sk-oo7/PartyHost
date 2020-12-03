import React, { useEffect, useState } from 'react'
import HomePage from '../../screens/hompage/HomePage';
import StartPage from '../../screens/start/StartPage';
import HamburgerMenu from './HamburgerMenu'
import img from "./user.png"

import './styles.css'

function MainPage() {

    const [userexists,setUserexists] = useState(false);
    const [user,setUser] = useState({});
    const [toggle,setToggle]=useState(false);

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUserexists(true)
            setUser(JSON.parse(localStorage.getItem("user")))
        }   
    }, [])

    const sidebarCloseHandler = () => {
        setToggle(false)
    }

    return (
        <div>
            <div className="navbar">
                <button className="hamburger_button" onClick={()=>setToggle(!toggle)}><img src="hamburger_icon.png" className="hamburger_icon"/></button>
                <button className="home_button"><b>Home</b></button>
                <button className="about_button">About</button>
                <button className="username_button"><img style={{height:"25px",float:"left"}} src={img}/><b style={{position:"relative",top:"5px",left:"-5px"}}>{userexists? user?.firstName+" "+user?.lastName : "Username"}</b></button>
            </div>
            {userexists && toggle && <HamburgerMenu close={sidebarCloseHandler} hamburgerMenu={"hamburger_menu"}/>}
            {userexists && toggle ? <HomePage classProp={"compact"}/> : (userexists && !toggle && <HomePage classProp={"grad"}/>)}

            {!userexists && toggle && <HamburgerMenu close={sidebarCloseHandler} hamburgerMenu={"hamburger_menu"}/>}
            {!userexists && <StartPage/>}
        </div>
    )
}

export default MainPage