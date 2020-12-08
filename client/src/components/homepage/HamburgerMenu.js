import React, { useState } from 'react'
import DisplayList from './DisplayList'

import './styles.css'

const HamburgerMenu = (props) => {
    const [hamburgerMenuClass, setHamburgerMenuClass] = useState(props.hamburgerMenu)

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
                <h1>F.R.I.E.N.D.S</h1>
            </div>
            <DisplayList />
            <br /><br />
            <button className="add_expense">+ Add an expense</button>
        </div>
    )
}

export default HamburgerMenu