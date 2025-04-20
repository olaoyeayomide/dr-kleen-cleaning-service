import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBanners } from "../../services/data";
import { ProductSlider } from "./ProductSlider";
import { ProductGrid } from "./ProductGrid";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
}

interface Banner {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  bgColor: string;
}

const Shop: React.FC = () => {
  const categories = [
    "Cleaning Machines",
    "Professional Tools",
    "Cleaning Supplies",
    "Safety Equipment",
    "All Products",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products/");
      setProducts(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/banners/");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    // Initial fetch for both products and banners
    fetchProducts();
    fetchBanners();

    // Set up polling intervals
    const productsIntervalId = setInterval(fetchProducts, 5000);
    const bannersIntervalId = setInterval(fetchBanners, 5000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(productsIntervalId);
      clearInterval(bannersIntervalId);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const filterProducts = (products: any[]) => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - no sorting needed
        break;
    }

    return filtered;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".filter-dropdown")) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = filterProducts(products);

  return (
    <div className="container mx-auto px-4 bg-gray-50 max-w-screen-lg min-h-screen">
      {/* Banner Slider */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden border rounded-lg bg-[#1B1F2D]">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16">
                <div className="w-full md:w-1/2 text-white text-center md:text-left pt-8 md:pt-0">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 md:mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-light mb-4 md:mb-8">
                    {slide.discount}
                  </p>
                  <button className="bg-white text-[#1B1F2D] px-6 md:px-8 py-2 md:py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors uppercase text-sm tracking-wider">
                    Shop Now
                  </button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-4 md:mt-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[150px] sm:max-h-[200px] md:max-h-[300px] lg:max-h-[400px] object-contain transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center"
        >
          <svg
            className="w-6 h-6 text-white/50 hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center"
        >
          <svg
            className="w-6 h-6 text-white/50 hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Small Dots Pattern - Hidden on mobile */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
          <div className="absolute top-8 right-8 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/10 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Product Grid */}
        <div className="mt-8">
          {/* Category and Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filter and Sort */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Filter Dropdown */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              min: Number(e.target.value),
                            })
                          }
                          className="w-24 px-2 py-1 border rounded"
                          placeholder="Min"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              max: Number(e.target.value),
                            })
                          }
                          className="w-24 px-2 py-1 border rounded"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>

        {/* Call to Action */}
        <div className="mt-8 md:mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 md:p-8 text-white text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            Need Expert Advice?
          </h2>
          <p className="text-sm md:text-base mb-4 md:mb-6">
            Our team of cleaning equipment specialists is here to help you
            choose the right tools for your needs
          </p>
          <button className="bg-white text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm md:text-base">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
