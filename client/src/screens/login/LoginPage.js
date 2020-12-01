import React from 'react'

import "./style.css"

import FirstDiv from '../../components/login/FirstDiv'
import SecondDiv from '../../components/login/SecondDiv'

function LoginPage() {
    return (
        <div className="login_div">
            <FirstDiv />
            <SecondDiv />
        </div>
    )
}

export default LoginPage