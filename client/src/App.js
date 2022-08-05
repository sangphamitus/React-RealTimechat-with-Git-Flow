import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Routes,BrowserRouter as Router,Route} from "react-router-dom"


import Join from './Components/Join/Join';

import Chat from './Components/Chat/Chat';
import Post from './Components/Post/Post';
import Navbars from './Components/Navbars/Navbars';
import Reg from './Components/Register/Reg'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" component={<Join/>} element={<Join/>}/>
          <Route path="/signup" component={<Reg/>} element={<Reg/>}/>
          <Route path="/chat" component={<Chat/>} element={<Chat/>}/>
          <Route path="/post" component={<Post/>} element={<Post/>}/>
        </Routes>    
        </Router> 
  </>
  );
}

export default App;
