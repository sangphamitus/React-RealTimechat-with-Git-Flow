import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";
import axios from 'axios'
import '../Post/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faComment } from '@fortawesome/free-solid-svg-icons'
import SubPost from "./SubPost/SubPost";
const ENDPOINT = 'http://localhost:5000';

let hrefPid;
export default function Post()
{
  
    const [username,setUsername]=useState('');
    const [postContent,setPostContent]=useState('');
    const [listPost,setListPost] =useState([]);
    const [cmt,setCmt] =useState('');
    const {pid} = queryString.parse(window.location.search);
    hrefPid=pid

    const fetchPost=()=>{
        axios.post(ENDPOINT+'/api/post/fetchPost',{

        },{
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            if(res.data.message==='success')
            {
                
                setListPost(listPost=> res.data.listPosts.listPosts);
                console.log(listPost)
            }
        })
    }

    const sendPost=(event)=>{
        event.preventDefault();
        axios.post(ENDPOINT+'/api/post/postPost',{
            username:username,
            type:'global',
            content:postContent
        },{
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            if(res.data.message==='success')
            {
                
                fetchPost();
                setPostContent("");
            }
        })
    }
    const enterHandle=(event,post)=> {
        event.preventDefault();

        console.log(`${post}:${cmt}`);
        axios.post(ENDPOINT+'/api/post/postPostComment',{
            postID:post,
            username:username,
            comment:cmt
        },{
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            if(res.data.message==='success')
            {
                document.getElementById('#cmtP'+post).value="";
                fetchPost()
            }
        })
    }
    useEffect(()=>{
      fetchPost();
    },[window.location])

    useEffect(()=> {
     
        axios.post(ENDPOINT+'/api/user/finduser',{
            "pid":hrefPid
        },{
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>
            {
               
                    if(res.data.message==='success')
                    {
                       setUsername(res.data.username);
                    }
                    else
                    {
                       throw Error('not have this pid');
                    }
             
               
            })
        .catch(error=>console.log(error.message))
    },[]);
 
    
  
    const calcHeight=(value)=> {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        numberOfLineBreaks =numberOfLineBreaks+Math.floor(postContent.length/48);
        // min-height + lines x line-height + padding + border
        let newHeight = 50 + numberOfLineBreaks * 25 + 15 + 5;
        if(newHeight<window.innerHeight*40/100)
        {
            let textarea = document.querySelector('.post-bar-search')
            textarea.style.height = newHeight +"px";
            
        }
       
    }
    const yearCalc=(year)=>{
        const day=new Date(year);

        return day.getDate()+'-'+day.getMonth()+'-'+day.getFullYear()+" "+day.getHours()+":"+day.getMinutes()+":"+day.getSeconds();
    }

    const focusInput=(id)=>{
        document.getElementById("#"+id).focus()
    }
    return(
        <div>
        <Navbars pid={hrefPid}/>
        <div className="post-bar">
            <div className="post-bar-search">

            <textarea type="text" 
                        value={postContent}
                        onChange={event=>{
                       calcHeight(event.target.value);
                        setPostContent(event.target.value);}}
                        placeholder={`what do you think ${username}`}
                        ></textarea>
         
            <button  className={postContent?"btn-content":" btn-content hidden"}
                    onClick={event=>sendPost(event)}>POST</button>
        
           
            </div>
          
        </div>

        <div className="post-view">
            
            {listPost.map(post=>
   
            <div id={post.postID}  className="post-card">
                <div className="title">
                <p className="user">{post.username}</p>
                <p className="time-title">{yearCalc(post.time)}</p>
                </div>
                <div className="content-handle">
                 <p className="content">{post.content}</p>
                </div>
          
                <div className="function-post">
                    <div className="func vlock-l">
                     
                        <button><FontAwesomeIcon icon={faHeart} size={"1x"} /> Like</button>
                     
                       </div>
                    <div className="func vlock-r">
                        <button onClick={event=>{focusInput("cmtP"+post.postID)}}>
                            <FontAwesomeIcon icon={faComment} size={"1x"} /> Comment</button>
                    </div>
                </div>
                <div className="cmt-field-limit">
                    <SubPost listComment={post.comments}></SubPost>
                        <div className="cmt-field">
                        <p className="cmt-user">{username}</p>
                        <input type="text" 
                                id={"#cmtP"+post.postID}
                            
                                onChange={event=>{
                            calcHeight(event.target.value);
                                setCmt(event.target.value);}}
                                onKeyPress={event=>(event.key=== 'Enter'? ( 
                                    event.shiftKey ? 
                                    event.preventDefault() :  enterHandle(event,post.postID) ):null)}
                                ></input>
                        </div>
                </div>
            </div>
           
         
        )}
        </div>
       
        </div>
    )
}