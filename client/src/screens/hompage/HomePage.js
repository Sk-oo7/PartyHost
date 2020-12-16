import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import "./style.css"


function HomePage(classProp) {

    const[dueAmount,setDueAmount] = useState(0);

    useEffect(() => {
        const data={
            id:JSON.parse(localStorage.getItem("user"))?.id
        }
        Axios.post("http://localhost:8080/api/user/getDueAmount",
        data,{
        headers:{
            "Content-Type":"application/json",
        }
        })
        .then(res=>setDueAmount(res.data))
    }, [])

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
                    <span className="show_money">{dueAmount >= 0 ? "You are currently owed" : "You currently owe" } <b>Rs. <span>{dueAmount >= 0 ? parseFloat(dueAmount).toFixed(2)  : parseFloat(dueAmount*-1).toFixed(2)}</span></b></span>
                </div>   
            </div>
        </div>
    )
}

export default HomePage