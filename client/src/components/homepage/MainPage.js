import React, { useEffect, useState } from "react";
import HomePage from "../../screens/hompage/HomePage";
import StartPage from "../../screens/start/StartPage";
import HamburgerMenu from "./HamburgerMenu";
import img from "./user.png";
//  import closeIcon from "../../../public/close_icon.png"

import "./styles.css";

function MainPage() {
  const [userexists, setUserexists] = useState(false);
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);
  const [showAddfrnd, setAddfriend] = useState(false);
  const [showEditProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserexists(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const sidebarCloseHandler = () => {
    setToggle(false);
  };

  
//   document.getElementById("main_add_friend").addEventListener("click",function(){
//     document.getElementById("center_alert").style.display="block";
// });
// document.getElementById("close1").addEventListener("click",function(){
//     document.getElementById("center_alert").style.display="none";
// });


  return (
    <div>
        {showAddfrnd && <div id="center_alert" >
        
<span style={{position:"relative"}}><center className="center_alert_head">Add Friend</center></span>
<img src="close_icon.png" id="close1" onClick={()=>setAddfriend(false)} />
<form>
<center><input type="textbox" className="center_alert_input" style={{borderRadius:"40px"}}
placeholder="Type to Search" required/></center>
<br/>
<center><input  className="center_alert_submit" style={{borderRadius:"40px"}}type="submit" value="Add Friend"/></center>

</form>
<br/>
        </div>}

      {showEditProfile &&  <div id="center_alert2" >
        
<span style={{position:"relative"}}><center className="center_alert_head">Edit Profile</center></span>
<img src="close_icon.png" id="close2" onClick={()=>setEditProfile(false)}/>
<form>
<center>
    <input type="textbox" className="center_alert_input2" placeholder="  First Name" style={{borderRadius:"20px"}}required/>
<input type="textbox" className="center_alert_input2" placeholder="  Last Name" style={{borderRadius:"20px"}}required/>
</center>
<br/>
<center><input  className="center_alert_input3"style={{borderRadius:"20px",border:"0px"}} type="textbox" placeholder="  Change phone number" required/></center>
<br/>
<center><input  className="center_alert2_submit"style={{borderRadius:"20px"}} type="submit" value="Add Friend"/></center>

</form>
<br/>
        </div>}
      <div className="navbar">
        <button className="hamburger_button" onClick={() => setToggle(!toggle)}>
          <img src="hamburger_icon.png" className="hamburger_icon" />
        </button>
        <button className="home_button">
          <b>Home</b>
        </button>
        <button className="about_button">About</button>
        <div class="dropdown" >
          <button className="username_button"  style={{height:"45px"}}>
            <img style={{ height: "25px", float: "left" }} src={img} />
            <b style={{ position: "relative", top: "5px", left: "-5px" }}>
              {userexists ? user?.firstName + " " + user?.lastName : "Username"}
            </b>
          </button>
          <div class="dropdown-content">
            <span onClick={()=>setAddfriend(true)} id="main_add_friend">Add Friend</span>
            <span  onClick={()=>setEditProfile(true)} >Edit Profile</span>
            <span>Sign-Out</span>
          </div>
        </div>
      </div>
   
      {userexists && toggle && (
        <HamburgerMenu
          close={sidebarCloseHandler}
          hamburgerMenu={"hamburger_menu"}
        />
      )}
      {userexists && toggle ? (
        <HomePage classProp={"compact"} />
      ) : (
        userexists && !toggle && <HomePage classProp={"grad"} />
      )}

      {!userexists && toggle && (
        <HamburgerMenu
          close={sidebarCloseHandler}
          hamburgerMenu={"hamburger_menu"}
        />
      )}
      {!userexists && <StartPage />}
    </div>
  );
}

export default MainPage;
