const Users=[];

const addUsers=({pid,name})=> {
 
    Users.push({pid,name})

    return {pid,name}
}

const findUser=(pid)=> {
   
    const users= Users.find(user=>user.pid===pid);
    
    console.log(`find users: ${users}`);
    if(!users)
    {
        return {error:new Error('not have id') };
    }
    return {users};
}
const updateSid =({pid,sid})=> {
    const users= Users.find(user=>user.pid===pid);
    if(!users)
    {
        return {error:new Error('not have id'),name:'' };
    }
    users.sid=sid;
    console.log(`find users: ${users}`);
   
    return {users};
}

const removeUser=(pid)=> {

   let index= Users.indexOf(Users.find(user=> user.pid ===pid));
   Users.splice(index,1);

}

const getUserInRoom=({room,pid})=> {
    const filter =Users.filter(user=>user.pid!==pid);
    const list_id=filter.map(user=>user.sid)
    return list_id;
}



module.exports ={addUsers,findUser,removeUser,updateSid,getUserInRoom};
