import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Otp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/reset-password-otp`,
        { email, otp, newPassword: password }
      );

      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>

        <p className="text-gray-600 mb-6">
          An OTP has been sent to: <b>{email}</b>
        </p>

        {/* OTP Input */}
        <input
          type="text"
          className="w-full p-3 border rounded mb-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {/* Password Input with toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password Input with toggle */}
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full p-3 border rounded"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Otp;
