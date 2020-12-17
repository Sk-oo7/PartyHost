import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import "./styles.css"
import Axios from 'axios';

function Form() {

    const history = useHistory()
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const [errAlert,setErroralert]=useState(false);
    const [successAlert,setSuccessalert]=useState(false);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("user")) !== null)
        history.push("/")
    }, [])

    const postData=()=>{
        if(firstname ==="" || lastname === "" || email === "" || password === "" || cpassword === ""){
            setError("Please enter all the fields!")
            setErroralert(true)
            return
        }

        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setError("Invalid email address")
            setErroralert(true)
            return
        }
        
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/.test(password)){
            setError("Password must contain numeric, uppercase, lowercase and special characters")
            setErroralert(true)
            return
        }

        if(password !== cpassword){
            setError("Passwords doesn't match!")
            setErroralert(true)
            return
        }

        let data = {
            firstName:firstname,
            lastName:lastname,
            emailId:email,
            password:password
        }

        Axios.post("http://localhost:8080/api/user/signup",
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
                setSuccess("SignUp Successfull")
                setSuccessalert(true)
                setTimeout(() => {
                    history.push("/login")
                  }, 1500);
                
            }
        })
        .catch(err=>{
            console.log(err.response.data.message);
            setError(err.response.data.message)
            setErroralert(true)
        })
    }

    const google=()=>{
        setError("Currently unavailable")
        setErroralert(true)
    }

    return (
        <div className="reg_form">
            <div className="full_name">
                <input 
                    type="text" 
                    name="fname" 
                    placeholder="First Name"
                    style={{width:"40%",marginRight:"27px"}}
                    onChange={(e)=>setFirstname(e.target.value)}
                    value={firstname}
                />
                <input 
                    type="text" 
                    name="fname" 
                    placeholder="Last Name"
                    style={{width:"40%"}}
                    onChange={(e)=>setLastname(e.target.value)}
                    value={lastname}
                />
            </div>
            <br />
            <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
            <br />
            <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
             />
             <br />
             <input 
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={(e)=>setCpassword(e.target.value)}
                value={cpassword}
             />
             <br />
             <button className="submit" onClick={()=>{postData()}}>Sign Up</button>
             <br />
             <div className="line">
                 <span></span>
                 <p>or</p>
                 <span></span>
            </div>
            <br /><br />
            <div className="signIn_with_google" onClick={()=>google()}>
                <img src="./google_image.png" />
                <span></span>
                <p>Sign Up with Google</p>
            </div>
             <div className="last_para">
                 <p>Already have an account ?
                 <Link to="/login"> Login</Link>
                </p>
            </div>
            <Snackbar open={errAlert} autoHideDuration={4000} onClose={()=>setErroralert(false)}>
                <Alert severity="error" onClose={()=>setErroralert(false)} >
                    {error}
                </Alert>
            </Snackbar>

             <Snackbar open={successAlert} autoHideDuration={4000} onClose={()=>setSuccessalert(false)} >
                <Alert severity="success" onClose={()=>setSuccessalert(false)}>
                    {success}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Form