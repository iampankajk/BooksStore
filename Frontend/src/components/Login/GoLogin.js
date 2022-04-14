import { useState } from "react";
import { GoogleLogin } from 'react-google-login';


const GoLogin = (props) => {
    const clientId = "371079031180-etdo357glr5lgnaooghl2csn3g2i2gus.apps.googleusercontent.com";
    const onLoginSuccess = (res) => {
        // console.log("Login Successfully", res.profileObj)
        props.onGoogleSubmit(res.profileObj);
    }

    const onFailureSuccess = (res) => {
        console.log("Login Failed", res);
    }
    return (
 
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={'single_host_origin'}
            />

    )
}

export default GoLogin;