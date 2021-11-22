import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { GoogleButton } from 'react-google-button'
import { useHistory } from 'react-router';





const clientId =
    '613642092414-lvnn10cq77c733cd23iqmqpmvih03j7j.apps.googleusercontent.com';

function SocialLogin() {
    console.log("sociallogin");
    const history = useHistory();
    const onSuccess = (res) => {
        alert(res.profileObj.name);
        sessionStorage.setItem('isSocialLogin', true);
        history.replace("/");
        //window.location.reload();
    };

    const onFailure = (res) => {
        sessionStorage.removeItem('isSocialLogin');
        console.log('Login failed: res:', res.profileObj === undefined);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };

    return (
        <div
        >
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <GoogleButton onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                       
                        style={{ width: 396 }}
                    >
                        Sign in with Google</GoogleButton>
                )
                }
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />

        </div >
    );
}

export default SocialLogin;