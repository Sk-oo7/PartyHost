import React, { useState } from 'react'
import HomePage from '../../screens/hompage/HomePage';
import HamburgerMenu from './HamburgerMenu'

import './styles.css'

function Navbar() {
    const [toggle,setToggle]=useState(false);

    const sidebarCloseHandler = () => {
        setToggle(false)
    }

    return (
        <div>
            <div className="navbar">
                <button className="hamburger_button" onClick={()=>setToggle(!toggle)}><img src="hamburger_icon.png" className="hamburger_icon"/></button>
                <button className="home_button"><b>Home</b></button>
                <button className="about_button">About</button>
                <button className="username_button"><b>Mayank Nagpal</b></button>
            </div>
            {toggle && <HamburgerMenu close={sidebarCloseHandler} hamburgerMenu={"hamburger_menu"}/>}
            {toggle ? <HomePage classProp={"compact"}/>: <HomePage classProp={"grad"}/>}
        </div>
    )
}

export default Navbar