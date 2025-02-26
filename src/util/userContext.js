// Context API for store the user crenditials 

import { createContext, useContext, useState } from "react"


const UserContext = createContext(); // create the contex

//Make provider 
export const UserProvider = ({childern})=>{
    const [user,setUser] = useState(null);
    return <UserContext.Provider value={{user,setUser}}>
        {childern}
    </UserContext.Provider>
}
//use the context
export const UseUserContex = ()=> useContext(UserContext);
