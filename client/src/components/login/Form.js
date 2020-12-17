import React , {useEffect, useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link,useHistory } from 'react-router-dom';
import axios from "axios"

import "./styles.css"

function Form() {

    const history = useHistory()
    const [password,setPassword]=useState("");
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
        if( email === "" || password === ""){
            setError("Please enter all the fields!")
            setErroralert(true)
            return
        }

        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setError("Invalid email address")
            setErroralert(true)
            return
        }

        let data = {
            emailId:email,
            password:password
        }

        axios.post("http://localhost:8080/api/user/login",
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
                setSuccess("Successfully signed in. Loading....")
                setSuccessalert(true)
                setTimeout(() => {
                    history.push("/")
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
        <div className="login_form">
            <input 
                type="email" 
                name="email" 
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
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
             <button className="submit" onClick={()=>{postData()}}>Sign In</button>
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
                <p>Sign In with Google</p>
            </div>
             <div className="last_para">
                 <p>New to PartyHost ?
                 <Link to="/register"> Create Account</Link>
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