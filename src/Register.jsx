import React, { useEffect, useState } from "react";
import { Appwrite } from 'appwrite';
import { ToastContainer, toast } from 'react-toastify';
import './register.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home";
function Register(props){
    const [user, setUser] = useState({
        username: "",
        password: "",
        cpassword:""
    })
    const [hidereglog,setHidereglog]=useState(true)
    const [isloggedin,setIsloggedin]=useState(false)
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
            
        })
        
    }
    const sdk = new Appwrite();

    sdk
        .setEndpoint('http://localhost/v1') 
        .setProject('6277a78f344f17c8b4cd') 
    ;
    const register=()=>{
        // console.log("eghek")
        if(!hidereglog){
            if(user.password!==user.cpassword)
            {
                toast('Passwords not matched', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                
            }
            else{
                if(user.password.length<8)
                {
                    toast('Password length should be greater than 8', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                else{
                    let promise = sdk.account.create('unique()', user.username, user.password,user.username);

                    promise.then(function (response) {
                        console.log('success')
                        console.log(response); // Success
                        toast('Successfully Registered, Please Login', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }, function (error) {
                        console.log(error); // Failure
                        toast('Username already exists', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    });
                    setHidereglog(!hidereglog)
                }
            }
        }
        else
        {
            let promise = sdk.account.createSession(user.username,user.password);

            promise.then(function (response) {
                console.log(response); // Success
                setIsloggedin(true);
                props.setLoginUser(user.username.split('@')[0])
            }, function (error) {
                console.log(error); // Failure
                toast('Please try again', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
        }
    }
    const hide=()=>{
        setHidereglog(!hidereglog);
    }
    return(
        <div className='container'>
            <div className={isloggedin? "hide": ""}>
                <input type="email" name="username" placeholder="e-Mail" value={user.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                <input type="password" className={hidereglog?"hide":""} name="cpassword" placeholder="Confirm Password" value={user.cpassword} onChange={handleChange} />
                
                <button type="submit" onClick={register}>{!hidereglog? 'Register':'Login'}</button>
                <br /><br /><a className="reg_login" onClick={hide}>{!hidereglog? 'Already Registered? Login':"New User? Register Here"}</a>
                {console.log(user)}
            </div>
            <div className={!isloggedin? "hide": ""}>
                <h1 className="styl">Hello {user.username.split('@')[0]}</h1>
                <Home />
            </div>
            <ToastContainer/>
        </div>
        
    )
}
export default Register;