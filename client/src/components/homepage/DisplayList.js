import React, { useEffect, useState } from 'react'
import axios from "axios"

function DisplayList() {

    const [friendsName,setFriendsName]=useState([]);
    const data = {
        id:JSON.parse(localStorage.getItem("user"))?.id
    }

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

    const status = [
        {
            id:"2",
            money:"0"
        },
        {
            id:"8",
            money:"-54.050"
        }
    ];

    const len = friendsName.length-1
    let money = ""
    
    return (
        <div className="friends_list" style={{overflowY: len < 4 ? 'hidden' : 'scroll'}}>
            <div>
                {friendsName.map((friendName,index) =>(
                   
                    <div key={index}>
                        {status.map(info=>{
                        if(info.id == friendName.id)
                            money = info.money
                        })}
                        <div className="friends_name" style={{overflowY: len < 4 ? 'hidden' : 'scroll'}}>
                            <p className="friends_icon"><i>{friendName.firstName.charAt(0)}</i></p>
                            <div className="friends_info">
                                <p><b>{friendName.firstName} {friendName.lastName}</b></p>
                                {money > 0 && <p className="owes_you">Owes you <b>₹ {money}</b></p>}
                                {money < 0 && <p className="you_owe">You Owe <b>₹ {-money}</b></p>}
                                {money === "0" && <p className="settled_up">Settled Up</p>}
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