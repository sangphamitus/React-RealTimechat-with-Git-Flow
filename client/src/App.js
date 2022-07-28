import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Routes,BrowserRouter as Router,Route} from "react-router-dom"

import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';
import Navbars from './Components/Navbars/Navbars';


function App() {
  return (
    <>
    
      <Router>
      <Navbars/>
        <Routes>
          <Route exact path="/" component={<Join/>} element={<Join/>}/>
          <Route path="/chat" component={<Chat/>} element={<Chat/>}/>
        </Routes>
      </Router>
  </>
  );
}

export default App;
