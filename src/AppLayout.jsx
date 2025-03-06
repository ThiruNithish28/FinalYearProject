import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/Login";
import LogUp from "./pages/LogUp";
import NewChat from "./pages/NewChat";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "../PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./util/context/AuthContext";
import { UserChatProvider } from "./util/context/userChatContext";

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
              path="/user"
              element={
                <PrivateRoute>
                  <UserProfile />
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
