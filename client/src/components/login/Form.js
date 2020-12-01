import React , {useState} from 'react'

import "./styles.css"

function Form() {
    return (
        <div className="login_form">
            <input 
                type="email" 
                name="email" 
                placeholder="Email"
                required
            />
            <br />
            <input 
                type="password"
                name="password"
                placeholder="Password"
             />
             <br />
             <button>Sign In</button>
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
                <p>Sign In with Google</p>
            </div>
             <div className="last_para">
                 <p>New to PartyHost ?
                     <a href=""> Create Account</a>
                </p>
            </div>
        </div>
    )
}

export default Form