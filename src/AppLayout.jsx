import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import LogUp from "./pages/LogUp";
import NewChat2 from "./pages/NewChat2";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import CommunityHomePage from "./pages/CommunityHomePage";
import CreatePost from "./pages/CreatePost";
import PrivateRoute from "../PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserChatProvider } from "./context/userChatContext";
import ResetPassword from "./pages/ResetPassword";
import Community from "./pages/Community";
import { CommunityContextProvider } from "./context/CommunityContext";
import PostDetails from "./pages/PostDetails";

const AppLayout = () => {
  return (
    <AuthProvider>
      <UserChatProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/log-up" element={<LogUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/new-chat"
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

            {/* Community */}
            <Route
              path="/community"
              element={
                <CommunityContextProvider>
                  <CommunityHomePage />
                </CommunityContextProvider>
              }
            />
            <Route
              path="/community/:communityName"
              element={
                <CommunityContextProvider>
                  <Community />
                </CommunityContextProvider>
              }
            />
            <Route
              path="/community/:communityName/create-post"
              element={
                <CommunityContextProvider>
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                </CommunityContextProvider>
              }
            />
            <Route
              path="/community/create-post"
              element={
                <CommunityContextProvider>
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                </CommunityContextProvider>
              }
            />
            <Route
              path="/post"
              element={<PostDetails/>}
            />
            <Route
              path="/:communityName/post/:postId"
              element={<CommunityContextProvider>
                <PostDetails/>
                </CommunityContextProvider>}
            />
          </Routes>
        </BrowserRouter>
      </UserChatProvider>
    </AuthProvider>
  );
};

export default AppLayout;
