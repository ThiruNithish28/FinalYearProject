import React from "react";

export default function LoginInteractiveHeader() {
  const Login = {
    header: " Welcome back dev/....",
    subHeader:
      "Let's continue your journey for learning, we are here for you",
  };
  const SignUp = {
    header: "Join us today",
    subHeader: "Let's start your journey of learning, we are here for you",
  };
  const currnet = window.location.pathname === "/" ? Login : SignUp;
  return (
    <div className="w-full mb-6">
      <h1 className="font-bold  text-2xl  mb-2 mt-6  ">{currnet.header}</h1>
      <p className="text-gray-300 ">{currnet.subHeader}</p>
    </div>
  );
}
