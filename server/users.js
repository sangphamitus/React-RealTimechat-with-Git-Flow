const Users={};

const addUsers=({ID,name})=> {
    Users[ID]=name;
    console.log (Users)
    return {ID,name}
}

const findUser=(ID)=> {
  
    return Users[ID];
}



module.exports ={addUsers,findUser};
