import { useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { auth } from "../fireBase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if email is empty before proceeding
    if (!email.trim()) {
      toast.error("Please enter a valid email!");
      return; // Prevent further execution
    }

    try {
      setLoading(true); // for disable the btn
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Check your inbox.");
    } catch (err) {
      console.log("Error : ", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
    // back to normal (undisable the btn)
  };
  return (
    <div className="bg-[#171717] flex flex-col  gap-8  w-full h-screen text-white">
      <Nav />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className=" flex flex-col items-center mt-10">
        <div className="max-w-[448px]  w-full px-5">
          <div className="mb-10">
            <h1 className="capitalize text-2xl font-semibold mb-2">
              reset your password
            </h1>
            <p className="text-light-gray">
              Type in your email and we'll send you a link to reset your
              password
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <p className="capitalize text-light-gray mb-2">email</p>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 mb-4 text-sm w-full border bg-input-dark rounded-md  outline-none border-gray-border placeholder:text-gray-border"
              />
            </div>

            <div className="w-full h-px my-5 bg-gray-border"></div>

            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 text-white capitalize font-semibold rounded-md w-full mb-4 
              ${
                loading || !email
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-sky-700 hover:bg-sky-800 hover:cursor-pointer"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>

            <div className="flex justify-center w-full mt-3">
              <p className="text-light-gray"> Already have an account? </p>

              <Link to="/" className="underline font-bold">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
