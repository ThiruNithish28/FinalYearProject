//this is for store the user chat history
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../util/supabaseClient";

const userchatContext = createContext();

export const useUserChatContext = ()=> useContext(userchatContext);

export const UserChatProvider = ({children})=>{
    const [allQuery, setAllQuery] = useState([]);   
    const [activeChatId, setActiveChatId] = useState(null);
    const didFetchRef = useRef(false);

    const {user} = useAuthContext(); // get the user from auth context
    
    useEffect(()=>{
        const fetchChats = async()=>{
            if(!user || didFetchRef.current) return; // if user not exist then return
            const savedChat = localStorage.getItem('user-chats');
            if(savedChat && user){
                setAllQuery(JSON.parse(savedChat));
                return;
            }

            const {data,error} = await supabase.from("user_chats").select("*").eq("user_id",user.id); // get the user chat history from supabase
            if(error){
                console.error("Error fetching data:", error.message);
            }else{
                setAllQuery(data); // set the data to context API
                didFetchRef.current=true;
                localStorage.setItem('user-chats', JSON.stringify(data));
            }
        }

        if(user) fetchChats(); // call the function to fetch the data
    },[user]); // when the user changes then call this function

    return(
        <userchatContext.Provider value={{allQuery,setAllQuery,activeChatId,setActiveChatId}}>
            {children}
        </userchatContext.Provider>
    )
}