import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Forgot_password = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/forgot-password`,
        { email }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <form className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
        <p className="text-gray-600 mb-6">Enter your email to receive a reset link.</p>

        <input
          type="email"
          className="w-full p-3 border rounded mb-4"
          placeholder="Enter registered email"
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default Forgot_password;
