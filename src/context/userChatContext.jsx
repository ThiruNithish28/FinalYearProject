//this is for store the user chat history
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../util/supabaseClient";

const userchatContext = createContext();

export const useUserChatContext = ()=> useContext(userchatContext);

export const UserChatProvider = ({children})=>{
    const [allQuery, setAllQuery] = useState([]);   
    const [activeChatId, setActiveChatId] = useState(null);

    const {user} = useAuthContext(); // get the user from auth context
    
    useEffect(()=>{
        const fetchChats = async()=>{
            if(!user) return; // if user not exist then return

            const {data,error} = await supabase.from("user_chats").select("*").eq("user_id",user.id); // get the user chat history from supabase
            if(error){
                console.error("Error fetching data:", error.message);
            }else{
                setAllQuery(data); // set the data to context API
            }
        }
        fetchChats(); // call the function to fetch the data
    },[user]); // when the user changes then call this function

    return(
        <userchatContext.Provider value={{allQuery,setAllQuery,activeChatId,setActiveChatId}}>
            {children}
        </userchatContext.Provider>
    )
}