import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Routes,BrowserRouter as Router,Route} from "react-router-dom"


import Join from './Components/Join/Join';

import Chat from './Components/Chat/Chat';
import Post from './Components/Post/Post';
import Navbars from './Components/Navbars/Navbars';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" component={<Join/>} element={<Join/>}/>
          <Route path="/chat" component={<Chat/>} element={<div id="getchat"><Navbars/><Chat/></div>}/>
          <Route path="/post" component={<Post/>} element={<div id="getpost"><Navbars/><Post/></div>}/>
        </Routes>    
        </Router> 
  </>
  );
}

export default App;
