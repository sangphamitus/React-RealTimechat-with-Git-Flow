import React from "react";
import './Join.css'

export default function Join()
{
    return(
        <div className="container" id="loginContainer">
          <div className="card">
           
            <form>
                <h2 className="centertext">JOIN LOGIN</h2>
                
                <fieldset>
                    <p>
                    <label>Username:</label>
                    <input type="text" placeholder="username"></input> 
                    </p>
                    <p> 
                    <label>Room:</label>
                    <input type="text"  placeholder="room"></input>
                    </p>
                    <div className="buttonbox">
                         <button  type="submit">Login</button>
                    </div>
                  
                </fieldset>
            </form>
          </div>       
        </div>
    )
}