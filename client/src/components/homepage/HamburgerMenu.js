import React, { useEffect, useState } from 'react'
import DisplayList from './DisplayList'

import './styles.css'

const HamburgerMenu = (props) => {
    const [hamburgerMenuClass, setHamburgerMenuClass] = useState(props.hamburgerMenu)
    const [userexists, setUserexists] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
          setUserexists(true);
        }
      }, []);

    const closeHandler = (event) => {
        event.preventDefault()
        setHamburgerMenuClass("hamburger_menu close")
        setTimeout(() => {
            props.close()
        },250)
    }

    return (
        <div className={hamburgerMenuClass}>
            <div className="header">
                <img src="close_icon.png" className="close_icon" onClick={closeHandler}/>
                {userexists && <h1>F.R.I.E.N.D.S</h1>}
                {!userexists && <div><img src="friends_icon.png" style={{height: "500px" , width: "500px", marginBottom:"100px", border: "2px solid black"}} /></div>}
            </div>
            <DisplayList />
            <br /><br />
            {userexists && <button className="add_expense">+ Add an expense</button>}
        </div>
    )
}

export default HamburgerMenu