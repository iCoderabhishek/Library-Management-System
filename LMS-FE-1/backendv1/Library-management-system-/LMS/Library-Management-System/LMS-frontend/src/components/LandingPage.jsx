import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar/Header */}
      <header className="bg-gray-800 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Library Management System</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#features" className="hover:text-gray-400">Features</a></li>
            <li><a href="/login" className="hover:text-gray-400">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Welcome Section */}
      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-bold mb-4">Welcome to Library Management System</h2>
        <p className="text-lg mb-8 text-gray-400">
          A complete solution to manage books, members, and transactions efficiently.
        </p>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Some Features</h3>
          <ul className="text-gray-400 space-y-4">
            <li>Manage books and members easily</li>
            <li>Track transactions and due dates</li>
            <li>Secure authentication for users</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
