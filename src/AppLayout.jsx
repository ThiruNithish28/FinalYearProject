import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/Login";
import LogUp from "./pages/LogUp";
import NewChat from "./pages/NewChat";
import NewChat2 from "./pages/NewChat2";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "../PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import { UserChatProvider } from "./context/userChatContext";
import CreatePost from "./pages/CreatePost";

const AppLayout = () => {
  return (
    <AuthProvider>
      <UserChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/log-up" element={<LogUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/new-chat"
              element={
                <PrivateRoute>
                  <NewChat />
                </PrivateRoute>
              }
            />
             <Route
              path="/new-chat2"
              element={
                <PrivateRoute>
                  <NewChat2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/community/create-post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserChatProvider>
    </AuthProvider>
  );
};

export default AppLayout;
