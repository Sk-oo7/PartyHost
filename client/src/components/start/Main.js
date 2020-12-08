import React from 'react'
import { Link } from 'react-router-dom'

import "./styles.css"

function Main() {
    return (
        <div className="container">
            <div>
                 <div className="m1">
                    <i>We keep track of your expenses so you can<br/> 
                       keep other important things in your brain.<br/>
                     </i>
            </div>
            <br/><br/>
            <center>
                <span className="boxx"> 
                    <button className="login" 
                        style={{fontSize:"20px",border:"none",outline:"none"}}>
                        <i className="link"><Link to="/login">Sign In</Link></i></button> /<button className="signup"
                 style={{fontSize:"20px",border:"none",outline:"none"}}><i className="link"><Link to="/register">Sign Up</Link></i></button></span>
            </center>
        </div>
        <div>
            <i style={{fontSize:"40px",color:"white"}}> <b><center>PartyHost</center></b></i><br/>
   <center style={{marginTop:"-30px",fontSize:"20px",color:"white"}}>An expense tracking / managing <br/>application.</center>
</div>
        </div>
    )
}

export default Main