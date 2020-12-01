import React from 'react'

import "./style.css"

import FirstDiv from '../../components/register/FirstDiv'
import SecondDiv from '../../components/register/SecondDiv'

function RegisterPage() {
    return (
        <div className="reg_div">
            <FirstDiv />
            <SecondDiv />
        </div>
    )
}

export default RegisterPage