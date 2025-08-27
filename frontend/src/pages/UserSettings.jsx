import React, { useState } from "react";
import { User, Bell, Lock, Globe, HelpCircle, LogOut } from "lucide-react";


function UserSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      
      
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-sm p-6 space-y-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-green-600">
            <User size={48} />
          </div>
          <h2 className="mt-4 font-semibold text-lg">Guest</h2>
          <p className="text-gray-500 text-sm">guest@gmail.com</p>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            <li
              className={`px-4 py-3 rounded-lg cursor-pointer flex items-center space-x-3 ${
                activeTab === "profile"
                  ? "bg-indigo-50 text-green-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={18} />
              <span>Profile</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-8">{renderContent()}</div>
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Settings
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-green-500">
            <User size={40} />
          </div>
          <div>
            <h2 className="font-semibold">Profile Picture</h2>
            <div className="flex space-x-3 mt-2">
              <button className="px-4 py-2 bg-indigo-50 text-green-500 rounded-lg hover:bg-indigo-100">
                Upload New
              </button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Jane"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Smith"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="jane.smith@example.com"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              defaultValue="I'm a UX designer passionate about creating intuitive digital experiences."
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none h-24"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Contact Information</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              defaultValue="San Francisco, CA"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}



export default UserSettings;
