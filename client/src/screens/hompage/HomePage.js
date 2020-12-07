import React, { useState } from 'react'

import "./style.css"

function HomePage(classProp) {
    const [toggleClass,setClass] = useState(classProp.classProp)
    return (
        <div className="div">
            <div className={classProp.classProp}>
                <div className="grad_div1">
                    <h1 style={{fontSize: "40px"}}><i>PartyHost</i></h1>
                    <br />
                    <center>
                    <p style={{fontSize: "20px"}}>An expense tracking / managing <br /> application.</p>
                    </center>
                </div>
                <div className="grad_div2">
                    <center>
                        <p style={{fontSize: "25px"}}>Click the hamburger menu to <br/>add an expense</p>
                    </center>
                    <br />
                    <span className="show_money">You currently owned <b>Rs. <span>1991.58</span></b></span>
                </div>   
            </div>
        </div>
    )
}

export default HomePage