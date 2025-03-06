//this is for store the user chat history
import { createContext, useContext, useState } from "react";

const userchatContext = createContext();

export const useUserChatContext = ()=> useContext(userchatContext);

export const UserChatProvider = ({children})=>{
    const [allQuery, setAllQuery] = useState([]);   
    const [activeChatId, setActiveChatId] = useState(null);
    return(
        <userchatContext.Provider value={{allQuery,setAllQuery,activeChatId,setActiveChatId}}>
            {children}
        </userchatContext.Provider>
    )
}