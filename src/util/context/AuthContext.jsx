// Context API for store the user crenditials

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../fireBase";

const AuthContext = createContext(); // create the contex

//use the context
export const UseAuthContext = () => useContext(AuthContext);

//Make provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // we have notify that loading before we get the user so that use this

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // after get make as false , which means we get the user and loading is complete
    }); // this method returns the method that when we call this method it'll unsubscribe this on off stte changed event

    return unsubscribe; // clean up the listener so we return (Which act like final[clean up the code/ opiration we done])
  }, []);

  // logOut function
  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // clear the current user state
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
      throw error; // trowsa the error for manula handiling where it calls
    }
  };

  // Google Sign-In function
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  };

  const signInWithGitHub= async()=>{
    const githubProvider = new GithubAuthProvider();
    try{
      const reuslt = await signInWithPopup(auth,githubProvider);
      setCurrentUser(reuslt.user);
    }catch(error){
      console.error("Github Sign-In Error:", error.message);  
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, logOut, signInWithGoogle, signInWithGitHub }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
