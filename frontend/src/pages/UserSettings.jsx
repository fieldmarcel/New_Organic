import React, { useEffect, useState } from "react";
import { User, Camera, Mail, Save, X, Upload, AtSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function UserSettings() {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("data");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedData = JSON.parse(userData);
        setFormData({
          userName: parsedData.userName || "",
          fullName: parsedData.fullName || "",
          email: parsedData.email || "",
          bio: parsedData.bio || "",
          profileImage: parsedData.profileImage || "",
        });
        setProfileImagePreview(parsedData.profileImage || null);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setPageLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setMessage({ type: "error", text: "Please upload a JPG, PNG, or GIF file" });
        return;
      }

      if (file.size > 8 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 8 MB" });
        return;
      }

      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setMessage({ type: "success", text: "Image selected successfully" });
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview(formData.profileImage || null);
    setMessage({ type: "", text: "" });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      if (!formData.fullName.trim()) {
        setMessage({ type: "error", text: "Full name is required" });
        setLoading(false);
        return;
      }

      if (!formData.userName.trim()) {
        setMessage({ type: "error", text: "Username is required" });
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        setMessage({ type: "error", text: "Authentication token not found. Please log in again." });
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName.trim());
      formDataToSend.append("fullName", formData.fullName.trim());
      formDataToSend.append("bio", formData.bio.trim());

      if (profileImage) {
        formDataToSend.append("image", profileImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
          body: formDataToSend
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          type: "error",
          text: data.message || "Failed to update profile"
        });
        return;
      }

      if (data.user) {
        const userData = JSON.parse(localStorage.getItem("data") || "{}");
        userData.userName = data.user.userName;
        userData.fullName = data.user.fullName;
        userData.bio = data.user.bio;
        userData.profileImage = data.user.profileImage;
        localStorage.setItem("data", JSON.stringify(userData));

        setFormData(prev => ({
          ...prev,
          userName: data.user.userName,
          fullName: data.user.fullName,
          bio: data.user.bio,
          profileImage: data.user.profileImage
        }));

        setProfileImagePreview(data.user.profileImage);
      }

      setMessage({
        type: "success",
        text: "Profile updated successfully!"
      });

      setProfileImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "An error occurred while updating profile"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const userData = localStorage.getItem("data");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setFormData({
        userName: parsedData.userName || "",
        fullName: parsedData.fullName || "",
        email: parsedData.email || "",
        bio: parsedData.bio || "",
        profileImage: parsedData.profileImage || "",
      });
    }
    setProfileImage(null);
    setProfileImagePreview(formData.profileImage || null);
    setMessage({ type: "", text: "" });
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and account preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`p-4 rounded-2xl font-medium mb-6 animate-in slide-in-from-top ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : "bg-red-100 text-red-800 border-2 border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {!isLoggedIn && (
          <div className="p-4 rounded-2xl font-medium bg-blue-100 text-blue-800 border-2 border-blue-300 mb-6">
            ℹ️ You are viewing as a guest. Log in to save your changes permanently.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1">
            <Card className="rounded-3xl shadow-2xl border-0 bg-white sticky top-8">
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  {/* Profile Picture */}
                  <div className="relative mb-6">
                    <div className="h-40 w-40 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-2xl overflow-hidden ring-4 ring-white">
                      {profileImagePreview ? (
                        <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={80} strokeWidth={2} />
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer ring-4 ring-white">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* User Info */}
                  <h2 className="text-2xl font-black text-gray-900 text-center mb-1">
                    {formData.fullName || "User"}
                  </h2>
                  <p className="text-green-600 font-semibold text-sm mb-1">@{formData.userName}</p>
                  <p className="text-gray-500 text-xs mb-4">{formData.email}</p>

                  {!isLoggedIn && (
                    <span className="text-xs text-orange-600 font-bold bg-orange-100 px-4 py-2 rounded-full">
                      Guest User
                    </span>
                  )}

                  {/* Profile Image Controls */}
                  <div className="w-full mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-sm text-gray-700 mb-3">Profile Picture</h3>
                    <p className="text-xs text-gray-500 mb-4">JPG, PNG or GIF (Max 5MB)</p>
                    <div className="flex flex-col gap-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Upload size={16} />
                        Upload New Photo
                      </Button>
                      {profileImagePreview && (
                        <Button
                          onClick={handleRemoveImage}
                          disabled={loading}
                          variant="outline"
                          className="w-full border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-600 transition-all"
                        >
                          Remove Photo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="w-full mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {/* <div className="bg-green-50 rounded-2xl p-4">
                        <p className="text-2xl font-black text-green-600">12</p>
                        <p className="text-xs text-gray-600 font-semibold">Recipes</p>
                      </div>
                      <div className="bg-emerald-50 rounded-2xl p-4">
                        <p className="text-2xl font-black text-emerald-600">45</p>
                        <p className="text-xs text-gray-600 font-semibold">Followers</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-3xl shadow-2xl border-0 bg-white">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    Profile Information
                  </h2>
                  <p className="text-gray-600">Update your account details and preferences</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Username */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-100">
                    <Label htmlFor="userName" className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <AtSign size={18} className="text-green-600" />
                      Username
                    </Label>
                    <Input
                      id="userName"
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Choose a unique username"
                      disabled={loading}
                      className="border-2 border-green-200 rounded-xl h-14 text-lg font-semibold focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 bg-white"
                    />
                    <p className="text-xs text-green-700 mt-2 font-medium">This will be your public profile URL</p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-bold text-gray-800 mb-3 block">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      disabled={loading}
                      className="border-2 border-gray-200 rounded-xl h-14 text-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Mail size={18} className="text-gray-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled={true}
                      className="border-2 border-gray-200 rounded-xl h-14 text-lg bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-2 font-medium">Email cannot be changed for security reasons</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio" className="text-sm font-bold text-gray-800 mb-3 block">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself, your cooking style, favorite cuisines..."
                      disabled={loading}
                      maxLength={300}
                      className="border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 h-40 resize-none text-base"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500 font-medium">
                        Share your culinary journey with the community
                      </p>
                      <p className="text-xs font-bold text-gray-700">
                        {formData.bio.length}/300
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleCancel}
                    disabled={loading}
                    variant="outline"
                    className="px-10 py-6 border-2 border-gray-300 rounded-xl font-bold text-gray-700 flex items-center gap-2 disabled:opacity-50 hover:bg-gray-50 transition-all"
                  >
                    <X size={20} />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={loading || !isLoggedIn}
                    className="px-10 py-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 font-bold flex items-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card className="rounded-3xl shadow-xl border-0 bg-gradient-to-br from-green-500 to-emerald-600 mt-6 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Profile Tips</h3>
                    <p className="text-sm text-white/90">
                      A complete profile helps you connect with other food enthusiasts and showcase your culinary creations!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;