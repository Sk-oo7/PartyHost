import React, { useEffect, useState } from 'react'
import axios from "axios"

function DisplayList() {

    const [friendsName,setFriendsName]=useState([]);
    const [status,setStatus]=useState([]);
    const data = {
        id:JSON.parse(localStorage.getItem("user"))?.id
    }
    const[userexist]=useState(JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
        axios.post("http://localhost:8080/api/user/friendList",
        data,{
            headers:{
                "Content-Type":"application/json",
            }
        })
        .then(res=>res.data)
        .then(value=>setFriendsName(value))
    }, [])

    useEffect(() => {
        axios.post("http://localhost:8080/api/user/getFriendsAmount",
        data,{
            headers:{
                "Content-Type":"application/json",
            }
        })
        .then(res=>res.data)
        .then(value=>setStatus(value))
    }, [])

    const len = friendsName.length-1
    let money = ""

    return (
        <div className="friends_list" style={{overflowY: len < 4 ? 'hidden' : 'scroll',marginTop:"100px"}}>
            <div>
                {userexist && friendsName.length === 0 && <center><h2 style={{color:"gray"}}>You don't have any friend right now Please add friends to get started</h2></center>}
                {friendsName.map((friendName,index) =>(
                   
                    <div key={index}>
                        {status.map(info=>{
                        if(info.friendId == friendName.id)
                            money = info.amountDue
                        })}
                        <div className="friends_name">
                            <p className="friends_icon">{friendName.firstName.toUpperCase().charAt(0)}</p>
                            <div className="friends_info">
                                <p><b>{friendName.firstName} {friendName.lastName}</b></p>
                                {money == 0.00 && <p className="settled_up">Settled Up</p>}
                                {money > 0.00 && <p className="owes_you">Owes you <b>₹ {parseFloat(money).toFixed(2)}</b></p>}
                                {money < 0.00 && <p className="you_owe">You Owe <b>₹ {parseFloat(-money).toFixed(2)}</b></p>}
                            </div>
                        </div>
                        
                        {index !== len && <hr />}
                        
                    </div>)
                )}
            </div>
        </div>
    )
}

export default DisplayList