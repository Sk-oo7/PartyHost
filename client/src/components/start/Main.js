import React from 'react'

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
                        <i>Sign In</i></button> /<button className="signup"
                 style={{fontSize:"20px",border:"none",outline:"none"}}><i>Sign Up</i></button></span>
            </center>
        </div>
        <div style={{fontSize:"20px",color:"white"}}>
            <i style={{fontSize:"30px",color:"white"}}> <b><center>PartyHost</center></b></i><br/>
   <center>An expense tracking / managing <br/>application.</center>
</div>
        </div>
    )
}

export default Main