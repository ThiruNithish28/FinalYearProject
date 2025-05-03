import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Eye, EyeClosed } from "lucide-react";
import SocialLoginButton from "../components/SocialLoginButton";
import Seperator from "../components/Seperator";
import LoginInteractiveHeader from "../components/LoginInteractiveHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { signInWithEmail} = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: "", password: "" });

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is Required" }));
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is Required" }));
      setLoading(false);
      return;
    }

    // if(Object.keys(newErrors).length >= 0) return;
    try {
      await signInWithEmail(email, password);
      toast.success("Log in SucessFull");
      navigate("/new-chat");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#171717] w-full ">
      <nav className="flex justify-between w-ful px-4 py-2 mb-1 ">
        <h1 className="font-extrabold text-sky-700 text-2xl ">
          CodeMastery Hub
        </h1>
      </nav>

      <ToastContainer position="top-right" autoClose={5000} />

      <div
        style={{ height: "calc(100dvh - 40px )" }}
        className="flex items-start justify-center"
      >
        <div className="flex flex-col items-center justify-center text-white  w-[330px] sm:w-[384px]  ">
          <LoginInteractiveHeader />
          <SocialLoginButton />
          <Seperator />
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full mb-4 ">
              <p className="text-light-gray capitalize mb-2">Email</p>
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                  errors.email ? " border-red-500 " : "border-gray-border "
                }px-4 py-3 w-full border bg-input-dark rounded-md  outline-none  placeholder:text-gray-border`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* password input */}
            <div className="w-full mb-4">
              <div className="w-full flex justify-between">
                <p className="text-light-gray capitalize mb-2">password</p>
                <Link
                  to="/forgot-password"
                  className="text-light-gray capitalize hover:cursor-pointer mb-2"
                >
                  forgot password?
                </Link>
              </div>

              <div
                className={`${
                  errors.password ? " border-red-500 " : "border-gray-border "
                }px-2  flex items-center w-full border bg-input-dark    rounded-md shadow-sm `}
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  placeholder="........"
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-2 py-3  w-full bg-input-dark outline-none placeholder:text-gray-border"
                />
                {/* toogle password icons */}
                <div onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Eye /> : <EyeClosed />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "cursor-progress " : "cursor-pointer"
              } px-10 py-3 bg-sky-700 text-white capitalize rounded-md  w-full mb-4`}
            >
              {loading ? "loading..." : "Log In"}
            </button>
            <div>
              <p className="text-light-gray w-full text-center">
                Don't have an account?{" "}
                <Link to="/log-up" className="text-white underline">
                  Sign Up Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
