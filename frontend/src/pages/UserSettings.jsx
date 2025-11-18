import React, { useState } from "react";
import { User, Camera, Mail, MapPin, Save, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function UserSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    alternateEmail: "jane.alternate@example.com",
    bio: "I'm a food enthusiast passionate about discovering and sharing amazing recipes from around the world.",
    location: "San Francisco, CA"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("Saving changes:", formData);
    // Add your save logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings formData={formData} handleChange={handleChange} handleSave={handleSave} />;
      default:
        return <ProfileSettings formData={formData} handleChange={handleChange} handleSave={handleSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-100 to-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Card className="rounded-3xl shadow-xl border-0 sticky top-8">
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-white-400 via-white-400 to-teal-400 flex items-center justify-center text-white shadow-2xl">
                      <User size={60} strokeWidth={2} />
                    </div>
                    <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300">
                      <Camera size={18} />
                    </button>
                  </div>
                  <h2 className="mt-6 font-black text-2xl text-gray-900">Guest User</h2>
                  <p className="text-gray-500 text-sm mt-1 font-medium">guest@gmail.com</p>
                </div>

                <nav className="mt-8">
                  <ul className="space-y-2">
                    <li
                      className={`px-5 py-4 rounded-2xl cursor-pointer flex items-center space-x-3 transition-all duration-300 ${
                        activeTab === "profile"
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-green-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User size={20} />
                      <span className="font-semibold">Profile Settings</span>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ formData, handleChange, handleSave }) {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl shadow-xl border-0">
        <CardContent className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 font-medium">Manage your personal information and preferences</p>
          </div>

          {/* Profile Picture Section */}
          <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white shadow-xl">
                <User size={48} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Profile Picture</h3>
                <p className="text-sm text-gray-600 mb-3">JPG, PNG or GIF - Max size 5MB</p>
                <div className="flex space-x-3">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Upload New
                  </Button>
                  <Button variant="outline" className="border-2 rounded-xl">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-sm font-bold text-gray-700 mb-2">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-2 rounded-xl h-12 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-bold text-gray-700 mb-2">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-2 rounded-xl h-12 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 rounded-xl h-12 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-bold text-gray-700 mb-2">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="border-2 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 h-32 resize-none"
              />
              <p className="text-sm text-gray-500 mt-2 font-medium">Brief description for your profile (max 200 characters)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="rounded-3xl shadow-xl border-0">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900 mb-1">Contact Information</h2>
            <p className="text-gray-600 font-medium">Update your contact details</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="alternateEmail" className="text-sm font-bold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  Alternate Email
                </div>
              </Label>
              <Input
                id="alternateEmail"
                type="email"
                name="alternateEmail"
                value={formData.alternateEmail}
                onChange={handleChange}
                className="border-2 rounded-xl h-12 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-bold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </div>
              </Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border-2 rounded-xl h-12 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          className="px-8 py-6 border-2 rounded-xl font-bold text-gray-700 flex items-center gap-2"
        >
          <X size={18} />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-green-300 transition-all duration-300 transform hover:scale-105 font-bold flex items-center gap-2"
        >
          <Save size={18} />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default UserSettings;