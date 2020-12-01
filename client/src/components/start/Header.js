import React from 'react'

import "./styles.css"

function Header() {
    return (
        <div className="navbar">
        <button className="home" style={{border:"none",outline:"none"}}>Home</button>
        <button className="about" style={{border:"none",outline:"none"}}>About</button>
        <span className="box" style={{display:"flex",flexDirection:"row",justifyContent:"center"}}> 
        <button className="login"style={{border:"none",outline:"none"}}><b>Sign In </b>
        </button> <b> / </b> <button className="signup" style={{marginBottom:"2px",border:"none",outline:"none"}}><b> Sign Up   </b></button>
      <img src="user_icon.png" style={{height:"20px",width:"20px"
    ,border:"2px solid black",borderRadius:"50%",marginLeft:"10px"}}/>
    
       </span>

        <br/>
    </div>
    )
}

export default Header