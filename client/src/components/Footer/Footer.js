import React from 'react'
import "./style.css"

function Footer() {
    return (
        <div className="container12">
            <div className="center21" style={{backgroundColor:"whitesmoke"}}>
                <div className="heading12"><center><b>ABOUT</b> US<br/> AND <b>WHAT</b> MAKES IT UNIQUE</center></div>
                <div ><center style={{fontSize:"24px"}}>Party Host makes it easy to split bills with friends and family. It organizes all your shared expenses and IOUs in one place so that everyone can see who they owe. Whether you are sharing a ski vacation, splitting rent with roommates, or paying someone back for lunch, Party Host makes life easier. We store your data in the cloud so that you can access it anywhere.</center></div>

                <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row"}}>

                    <div className="card12">
                    <img src="man.png" style={{width:"80%",height:"52%"}} />
                    <h1>Mayank Nagpal</h1>
                    <p className="title12">Backend Developer</p>
                    <p>Chitkara University</p>
                    <p> Id: 1811981180 </p>
                    </div>

                    <div className="card12">
                    <img src="man.png" style={{width:"80%",height:"52%" }}/>
                    <h1>Shubham Khullar</h1>
                    <p className="title12">Backend Developer</p>
                    <p>Chitkara University</p>
                    <p> Id: 1811981299 </p>
                    </div>

                    <div className="card12">
                    <img src="man.png" style={{width:"80%",height:"52%"}} />
                    <h1>Tanish Sharma</h1>
                    <p className="title12">Team Head</p>
                    <p>Chitkara University</p>
                    <p> Id: 1811981322 </p>
                    </div>
</div><div style={{display:"flex",flexWrap:"wrap",flexDirection:"row"}}>
                    <div className="card12">
                    <img src="man.png" style={{width:"80%",height:"52%"}} />
                    <h1>Muskan Doomra</h1>
                    <p className="title12">Frontend Developer</p>
                    <p>Chitkara University</p>
                    <p> Id: 1811981190 </p>
                    </div>

                    <div className="card12">
                    <img src="man.png" style={{width:"80%",height:"52%"}} />
                    <h1>Govind Singhal</h1>
                    <p className="title12">Frontend Developer</p>
                    <p>Chitkara University</p>
                    <p> Id: 1811981374 </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
