import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import NewChat from "./pages/NewChat";
const AppLayout =()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<NewChat/>}/>
            <Route path="/login" element= {<Login/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppLayout;