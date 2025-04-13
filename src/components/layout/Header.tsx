import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-2">
            <img
              src="https://i.ibb.co/LtcYFd9/Dr-Kleen-Logo2.png"
              alt="Dr-Kleen-Logo2"
              className="h-10"
            />
          </div>
          <div>
            <h1 className="font-bree text-2xl font-bold text-gray-800">
              Dr.Kleen
            </h1>
            <p className="font-public text-xs text-gray-500">
              Cleaning service
            </p>
          </div>
        </div>

        {/* Mobile Menu and Cart */}
        <div className="flex items-center lg:hidden space-x-4">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <i className="fas fa-shopping-cart text-gray-600"></i>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <i className="fas fa-bars text-2xl text-gray-600"></i>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/home"
            className="text-secondary font-medium border-b-2 border-blue-500 pb-1"
          >
            Home
          </Link>
          <Link to="/shop" className="text-gray-600 hover:text-secondary">
            Shop
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-secondary">
            About
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-secondary">
            Services
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-secondary">
            Portfolio
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-secondary">
            Pricing
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-secondary">
            Contact
          </Link>
        </nav>

        {/* Desktop Search and Cart */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
          </div>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <i className="fas fa-shopping-cart text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">DrKleen</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-xl">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Shop
            </Link>
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </Link>
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Services
            </Link>
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Portfolio
            </Link>
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Pricing
            </Link>
            <Link
              to="/home"
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Contact
            </Link>
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-xl">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700">No items in the cart.</p>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(isMenuOpen || isCartOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
    </header>
  );
};

export default Header;
