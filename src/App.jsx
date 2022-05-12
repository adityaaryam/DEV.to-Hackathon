import './App.css';
import React, { useEffect, useState } from "react";

import { Appwrite } from 'appwrite';
import Stopwatch from './Stopwatch';
import Login from './Register';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Register from './Register';
import Home from './Home';
function App() {

  const appwrite = new Appwrite();

  appwrite
      .setEndpoint('http://localhost/v1') 
      .setProject('6277a78f344f17c8b4cd') 
  ;
  const [user, setLoginUser]=useState("")
  return (
    <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={user&&user._id?<Home user={user}/>:<Register setLoginUser={setLoginUser}/>}/>
                    <Route path="/register" element={<Register setLoginUser={setLoginUser}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
