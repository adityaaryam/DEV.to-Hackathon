import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Appwrite } from 'appwrite';
import 'react-toastify/dist/ReactToastify.css';
import './register.css'
function Home(){
    console.log((localStorage.getItem('userid')))
    const [mscrc,setMscrc]=useState("")
    const fetchmeme=()=>{
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(response=>response.json())
            .then(data=>setMscrc(data.preview[data.preview.length-1]))
    }
    return(
        // <h1>hello</h1>
        <div>
            <p className="styl2">Reload page to logout</p>
        {/* <h1 className="styl">hello {localStorage.getItem('userid').split('@')[0]}</h1> */}
        <button onClick={fetchmeme} className="btn styl1">Fetch new Meme</button>
        <img width="500" src={mscrc}/>
        </div>
        )
}
export default Home;