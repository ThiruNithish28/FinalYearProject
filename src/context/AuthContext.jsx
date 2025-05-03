import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      setLoading(true);
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session fetch error:", sessionError.message);
        setUser(null);
        setProfile(null);
        return;
      }

      const loggedInUser = data?.session?.user ?? null;
      setUser(loggedInUser);

      if (loggedInUser) {
        const { data: profileData, error: profileError } = await supabase
          .from("public_profiles")
          .select("*")
          .eq("id", loggedInUser.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError.message);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  const signUpWithEmail = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    return user;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/new-chat`,
      },
    });
    if (error) console.log(error.message);
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/new-chat`,
      },
    });
    if (error) throw error;
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  const value = {
    user,
    profile,
    loading,
    signInWithEmail,
    signInWithGoogle,
    signInWithGithub,
    signUpWithEmail,
    signOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
