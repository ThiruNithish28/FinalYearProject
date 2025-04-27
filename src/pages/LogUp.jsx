import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../util/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UseAuthContext } from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Eye, EyeClosed } from "lucide-react";
import SocialLoginButton from "../components/SocialLoginButton";
import Seperator from "../components/Seperator";
import LoginInteractiveHeader from "../components/LoginInteractiveHeader";

const LogUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // to check that user is start type (password) if they start theeen only show the password rules
  const [loading, setLoading] = useState(false); // which will prevent the multiple click in the form submit btn (Login btn) [by using disable attribute in the btn ]

  const { signInWithGoogle, signInWithGitHub } = UseAuthContext();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
    };
  };

  const handlePasswordChange = (e) => {
    let newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordCheck(validatePassword(newPassword));
    setIsTyping(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please Enter a Valid Email" }));
      return;
    }
    //Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.length) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      return;
    }
    if (
      !passwordValidation.lowerCase ||
      !passwordValidation.upperCase ||
      !passwordValidation.number ||
      !passwordValidation.specialChar
    ) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must contain an uppercase letter, lowercase letter, number, and special character",
      }));
      return;
    }
    try {
      setLoading(true); // now user can able to click the btn again once we make false (by this we can restric multiple click in sign up btn)
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Log in SucessFull");
      navigate("/new-chat2");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false); // after complete we have to make back the btn to work
  };

  return (
    <div className="bg-[#171717] w-full ">
      <nav className="flex justify-between w-ful px-4 py-2 mb-1 ">
        <h1 className="font-extrabold text-sky-700 text-2xl ">
          CodeMastery Hub
        </h1>
      </nav>

      <ToastContainer position="top-right" autoClose={5000} />

      {/* logup parent container */}
      <div className="flex h-screen items-start justify-center">
        {/* logup container */}
        <div className="flex flex-col items-center justify-center text-white  w-[330px] sm:w-[384px]  ">
          <LoginInteractiveHeader />
          <SocialLoginButton />
          <Seperator />
          {/* Logup Form  */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full mb-4">
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
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="w-full mb-4">
              <p className="text-light-gray capitalize mb-2 ">password</p>
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
                  onChange={handlePasswordChange}
                  className="px-2 py-3  w-full bg-input-dark outline-none placeholder:text-gray-border"
                />
                {/* toogle password  icons */}
                <div onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Eye /> : <EyeClosed />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              {/* Password Strength Rules */}
              {isTyping && (
                <div className="text-sm text-gray-400 my-2">
                  <p
                    className={
                      passwordCheck.lowerCase
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  >
                    {passwordCheck.lowerCase ? "✅" : "⭕"} Lowercase letter
                  </p>
                  <p
                    className={
                      passwordCheck.upperCase
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  >
                    {passwordCheck.upperCase ? "✅" : "⭕"} Uppercase letter
                  </p>
                  <p
                    className={
                      passwordCheck.number ? "text-green-500" : "text-gray-400"
                    }
                  >
                    {passwordCheck.number ? "✅" : "⭕"} Number
                  </p>
                  <p
                    className={
                      passwordCheck.specialChar
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  >
                    {passwordCheck.specialChar ? "✅" : "⭕"} Special character
                    (e.g. !@#$%)
                  </p>
                  <p
                    className={
                      passwordCheck.length ? "text-green-500" : "text-gray-400"
                    }
                  >
                    {passwordCheck.length ? "✅" : "⭕"} 8 characters or more
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-sky-700 text-white capitalize rounded-md hover:cursor-pointer w-full mb-4"
            >
              Log Up
            </button>

            <div>
              <p className="text-light-gray w-full text-center mb-1.5">
                Have an account?{" "}
                <Link to="/" className="text-white underline">
                  Log In Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogUp;
