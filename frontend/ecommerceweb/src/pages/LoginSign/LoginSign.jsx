import React, { useState } from 'react'
import './LoginSign.css'
import imageS from '../../assets/responsive-image.png'
import { ShopContext } from '../../context/ShopContext'

const LoginSign = () => {
    const [curLog, setCurLog] = useState(false);
    const [agree, setAgree] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { signUp, logIn } = React.useContext(ShopContext);

    const changeHandler = (e) => {
        // console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const signup = async () => {

        if (!validateEmail(formData.email)) {
            window.alert("Please enter a valid email address");
            return;
        }

        if (!agree) {
            window.alert("You need to agree to the terms & conditions");
            return;
        }
        signUp(formData);


    }

    const login = async () => {
        if (!validateEmail(formData.email)) {
            window.alert("Please enter a valid email address");
            return;
        }
        logIn(formData);
    }
    return (

        <div>
            <div className="login-sign">
                <img src={imageS} alt="" />
                <div className="logsig-container">
                    <h1>{curLog ? 'Log In' : 'Sign Up'}</h1>
                    <div className="logsig-field">
                        {curLog ? '' : <input type='text' name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' />}

                        <input type="email" name='email' pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={formData.email} onChange={changeHandler} placeholder='Your Email' />
                        <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
                    </div>
                    <button onClick={() => {
                        if (curLog) {
                            login();
                        } else {
                            signup();
                        }
                    }}>Continue</button>
                    <p className='swicth-logsig'>{curLog ? 'Dont have an account? ' : 'Already have an account?'} <span onClick={() => setCurLog(curLog => !curLog)}>{curLog ? 'Sign Up' : 'Login'}</span></p>
                    {curLog ? '' : <div className="logsig-agree">
                        <input type="checkbox" name='agreement' id='' onClick={() => { setAgree(agree => !agree) }} />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>}

                </div>
            </div>
        </div>
    )
}
import './LoginSign.css'
export default LoginSign
