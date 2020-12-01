import React from 'react'

function DisplayList() {
    const friendsName = ["Shubham Khullar","Tanish","Muskan","Govind"]
    const len = friendsName.length-1
    const listFriends = friendsName.map((friendName,index) =>
        <div>
            <div className="friends_name">
                <p className="friends_icon">{friendName.charAt(0)}</p>
                <div className="friends_info">
                    {friendName}
                </div>
            </div>
            {index !== len && <hr />}
        </div>
    );
    return (
        <div className="friends_list" style={{overflowY: len<4 ? 'hidden' : 'scroll'}} >
            <div>{listFriends}</div>
        </div>
    )
}

export default DisplayList