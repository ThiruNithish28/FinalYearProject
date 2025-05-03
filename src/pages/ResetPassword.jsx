import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../util/supabaseClient";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      toast.success("Password updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171717] flex flex-col gap-8 w-full min-h-screen text-white p-4">
      <div className="max-w-md mx-auto mt-10 w-full">
        
        <h1 className="text-2xl font-semibold mb-4">Set New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-light-gray mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-input-dark rounded-md border border-gray-border"
              required
            />
          </div>
          <div>
            <label className="block text-light-gray mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-input-dark rounded-md border border-gray-border"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-medium ${
              loading ? "bg-gray-600" : "bg-sky-700 hover:bg-sky-800"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;