import React from 'react';

const SupportUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center justify-center">
      <section className="py-16 px-8 sm:px-16 lg:px-32 text-center bg-white rounded-lg shadow-xl max-w-screen-md w-full">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Support Organic ❤️</h2>
          <p className="text-lg text-gray-700 mb-8">
            Your support helps us create more delicious recipes, improve our services, and keep the FoodChef community thriving!
          </p>

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Payment System Temporarily Down</strong>
            <span className="block sm:inline"> We are currently experiencing technical difficulties with our payment system. We apologize for any inconvenience. Please try again later.</span>
          </div>

          <div className="mb-8 opacity-50 cursor-not-allowed">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Choose an Amount:</h3>
            <div className="flex justify-center space-x-4">
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">$5</button>
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">$10</button>
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">$25</button>
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">$50</button>
            </div>
          </div>

          <div className="mb-8 opacity-50 cursor-not-allowed">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Enter Custom Amount:</h3>
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                $
              </span>
              <input
                type="number"
                className="rounded-r-md flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 cursor-not-allowed"
                placeholder="Enter amount"
                disabled
              />
            </div>
          </div>

          <div className="mb-8 opacity-50 cursor-not-allowed">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment Options:</h3>
            <div className="flex justify-center space-x-4">
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">PayPal</button>
              <button disabled className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed">Credit Card</button>
            </div>
          </div>

          <p className="text-lg text-green-600 font-semibold">
            Thank you for your patience! 🙏
          </p>
        </div>
      </section>
    </div>
  );
};

export default SupportUs;
