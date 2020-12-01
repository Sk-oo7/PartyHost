import React from 'react'

import "./styles.css"

function Form() {
    return (
        <div className="reg_form">
            <div className="full_name">
                <input 
                    type="text" 
                    name="fname" 
                    placeholder="First Name"
                    style={{width:"40%",marginRight:"10px"}}
                />
                <input 
                    type="text" 
                    name="fname" 
                    placeholder="First Name"
                    style={{width:"40%"}}
                />
            </div>
            <br />
            <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                />
            <br />
            <input 
                type="password"
                name="password"
                placeholder="Password"
             />
             <br />
             <input 
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
             />
             <br />
             <button>Sign Up</button>
             <br />
             <div className="line">
                 <span></span>
                 <p>or</p>
                 <span></span>
            </div>
            <br /><br />
            <div className="signIn_with_google">
                <img src="./google_image.png" />
                <span></span>
                <p>Sign Up with Google</p>
            </div>
             <div className="last_para">
                 <p>Already have an account ?
                     <a href=""> LogIn</a>
                </p>
            </div>
        </div>
    )
}

export default Form