import React, { useEffect, useState } from "react";
import HomePage from "../../screens/hompage/HomePage";
import StartPage from "../../screens/start/StartPage";
import HamburgerMenu from "./HamburgerMenu";
import img from "./user.png";

import "./styles.css";
import Axios from "axios";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

function MainPage() {
  const [userexists, setUserexists] = useState(false);
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);
  const [showAddfrnd, setAddfriend] = useState(false);
  const [showEditProfile, setEditProfile] = useState(false);
  const [editFirstName,setFirstName]=useState(JSON.parse(localStorage.getItem("user"))?.firstName);
  const [editLastName,setLastName]=useState(JSON.parse(localStorage.getItem("user"))?.lastName);
  const [editNumber,setNumber]=useState(JSON.parse(localStorage.getItem("user"))?.mobileNumber);
  const [addFriend,setFriend]=useState("");
  const [success,setSuccess]=useState("");
  const [successAlert,setSuccessalert]=useState(false);
  const [disabled,setDisabled]=useState(true);
  const [disabled2,setDisabled2]=useState(true);
  const [error,setError]=useState("");
  const [errAlert,setErroralert]=useState(false);


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserexists(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const sidebarCloseHandler = () => {
    setToggle(false);
  };

  const signout = () =>{
    localStorage.clear();
    window.location.reload(true);
  }

  const submitProfile=()=>{
    const data={
      id:JSON.parse(localStorage.getItem("user")).id,
      firstName:editFirstName !== JSON.parse(localStorage.getItem("user")).firstName? editFirstName : null,
      lastName:editLastName !== JSON.parse(localStorage.getItem("user")).lastName? editLastName : null,
      mobileNumber:editNumber !== JSON.parse(localStorage.getItem("user")).mobileNumber? editNumber : null
    }

    Axios.post("http://localhost:8080/api/user/updateUserCredentials",
    data,{
      headers:{
        "Content-Type":"application/json",
    }
    })
    .then(res=>res.data)
    .then(data=>{
      if(data.error){
          setError(data.error)
          setErroralert(true)
      }
      else{
          localStorage.setItem("user",JSON.stringify(data))
          setEditProfile(false)
          setAddfriend(false)
          setSuccess("Successfully Updated Credentials")
          setSuccessalert(true)
          setDisabled(true)
      }
    })
    .catch(err=>{
      console.log(err.response.data.message);
      setError(err.response.data.message)
      setErroralert(true)
    })
  }

  const submitFriend=()=>{

    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addFriend)){
      setError("Invalid email address")
      setErroralert(true)
      return
  }
    const data={
      id:JSON.parse(localStorage.getItem("user")).id,
      friendEmailId:addFriend
    }

    Axios.post("http://localhost:8080/api/user/addFriend",
    data,{
      headers:{
        "Content-Type":"application/json",
    }
    })
    .then(res=>res.data)
    .then(data=>{
      if(data.error){
          setError(data.error)
          setErroralert(true)
      }
      else{
          setEditProfile(false)
          setAddfriend(false)
          setSuccess("Successfully Added Friend")
          setSuccessalert(true)
          setDisabled(true)
          setFriend("")
      }
    })
    .catch(err=>{
      console.log(err.response.data.message);
      setError(err.response.data.message)
      setErroralert(true)
    })
  }
  const scrollDown = () => {
    window.scrollTo({
      top: 745,
      behavior: "smooth",
    });
  };

  return (
    <div>
    
        {showAddfrnd && userexists && <div style={{position:"absolute",top:"0",bottom:"0",zIndex:"99",height:"100vh",width:"100%",backgroundColor:"rgb(0,0,0,0.5)"}} ><div id="center_alert">
                  
          <span style={{position:"relative"}}><center className="center_alert_head">Add Friend</center></span>
          <img src="close_icon.png" id="close1" onClick={()=>{setAddfriend(false),setDisabled2(true),setFriend("")}} />

          <form onSubmit={(e)=>e.preventDefault()}>

          <center><input type="textbox" className="center_alert_input" style={{borderRadius:"40px",height:"38px"}}
          placeholder="Type to Search" onChange={(e)=>{setFriend(e.target.value), setDisabled2(false)}} value={addFriend} required/></center>
          <center><input disabled={disabled2} onClick={()=>submitFriend()} className="center_alert_submit" style={{borderRadius:"40px"}} type="submit" value="Add Friend"/></center>

          </form>
          <br/>
        </div>
        </div>}

      {showEditProfile && userexists &&  <div style={{position:"absolute",top:"0",bottom:"0",zIndex:"99",height:"100vh",width:"100%",backgroundColor:"rgb(0,0,0,0.5)"}}><div id="center_alert2" >
        <span style={{position:"relative"}}><center className="center_alert_head">Edit Profile</center></span>
        <img src="close_icon.png" id="close2" onClick={()=>{setEditProfile(false),setDisabled(true),setFirstName(JSON.parse(localStorage.getItem("user"))?.firstName),setLastName(JSON.parse(localStorage.getItem("user"))?.lastName),setNumber(JSON.parse(localStorage.getItem("user"))?.mobileNumber)}}/>
        <form onSubmit={(e)=>e.preventDefault()}>
        <center>
            <input type="textbox" onChange={(e)=>{setFirstName(e.target.value), setDisabled(false)}} value={editFirstName} className="center_alert_input2" placeholder="  First Name" style={{borderRadius:"20px",marginTop:"-10px"}}required/>
        <input type="textbox"  onChange={(e)=>{setLastName(e.target.value), setDisabled(false)}} value={editLastName} className="center_alert_input2" placeholder="  Last Name" style={{borderRadius:"20px"}}required/>
        </center>
        <br/>
        <center><input  onChange={(e)=>{setNumber(e.target.value), setDisabled(false)}} value={editNumber} className="center_alert_input3"style={{borderRadius:"20px",border:"0px"}} type="textbox" placeholder="  Change phone number" required/></center>
        <br/>
        <center><input disabled={disabled} className="center_alert2_submit" style={{borderRadius:"20px"}} type="submit" onClick={()=>submitProfile()} value="Submit"/></center>

        </form>
        <br/>
        </div>
        </div>}

      <div className="navbar">
        <button className="hamburger_button" onClick={() => setToggle(!toggle)}>
          <img src="hamburger_icon.png" className="hamburger_icon" />
        </button>
        <button className="home_button">
          <b>Home</b>
        </button>
        <button className="about_button" onClick={()=>scrollDown()}>About</button>
        {userexists && <div className="dropdown" >
          <button className="username_button"  style={{height:"45px",width:"180px"}}>
            <img style={{ height: "25px", float: "left" }} src={img} />
            <b style={{ position: "relative", top: "5px", left: "-5px" }}>
              {userexists ? user?.firstName + " " + user?.lastName : "Username"}
            </b>
          </button>
          <div className="dropdown-content">
            <span onClick={()=>{setAddfriend(true),setEditProfile(false)}} id="main_add_friend">Add Friend</span>
            <span  onClick={()=>{setEditProfile(true),setAddfriend(false)}} >Edit Profile</span>
            <span onClick={()=>signout()}>Sign-Out</span>
          </div>
        </div>}
        {!userexists && <button className="username_button"  style={{height:"45px",marginRight:"112px"}}>
            <img style={{ height: "25px", float: "left" }} src={img} />
            <b style={{ position: "relative", top: "5px", left: "-5px" }}>
              {userexists ? user?.firstName + " " + user?.lastName : <><Link to="/login">Sign In</Link> / <Link to="/register">Sign Up</Link></>}
            </b>
          </button>}
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
            <Snackbar open={successAlert} autoHideDuration={2000} onClose={()=>setSuccessalert(false)} >
                <Alert severity="success" onClose={()=>setSuccessalert(false)}>
                    {success}
                </Alert>
            </Snackbar>
            <Snackbar open={errAlert} autoHideDuration={2000} onClose={()=>setErroralert(false)}>
                <Alert severity="error" onClose={()=>setErroralert(false)} >
                    {error}
                </Alert>
            </Snackbar>
    </div>
  );
}

export default MainPage;
