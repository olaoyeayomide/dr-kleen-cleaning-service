import React, { useState, useEffect } from "react";

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

  const bannerSlides = [
    {
      title: "Best Deal Online on Cleaning Equipment",
      subtitle: "PROFESSIONAL CLEANING TOOLS",
      discount: "UP to 60% OFF",
      image: "/images/banners/cleaning-equipment.png",
      bgColor: "bg-navy-900",
    },
    {
      title: "New Arrivals in Store",
      subtitle: "INDUSTRIAL VACUUM CLEANERS",
      discount: "UP to 40% OFF",
      image: "/images/banners/vacuum-cleaner.png",
      bgColor: "bg-blue-900",
    },
    {
      title: "Special Offer This Week",
      subtitle: "PRESSURE WASHERS",
      discount: "UP to 30% OFF",
      image: "/images/banners/pressure-washer.png",
      bgColor: "bg-indigo-900",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
  };

  const products = [
    {
      id: 1,
      name: "Professional Floor Scrubber",
      price: 1299.99,
      image: "/images/products/floor-scrubber.jpg",
      category: "Cleaning Machines",
      description: "Industrial-grade floor scrubber for commercial spaces",
    },
    {
      id: 2,
      name: "High-Pressure Washer",
      price: 499.99,
      image: "/images/products/pressure-washer.jpg",
      category: "Cleaning Machines",
      description: "Powerful pressure washer for exterior cleaning",
    },
    {
      id: 3,
      name: "Professional Vacuum Cleaner",
      price: 349.99,
      image: "/images/products/vacuum.jpg",
      category: "Cleaning Machines",
      description: "Heavy-duty vacuum for commercial use",
    },
    {
      id: 4,
      name: "Microfiber Cleaning Kit",
      price: 79.99,
      image: "/images/products/cleaning-kit.jpg",
      category: "Professional Tools",
      description: "Complete set of professional-grade microfiber tools",
    },
    {
      id: 5,
      name: "Industrial Steam Cleaner",
      price: 899.99,
      image: "/images/products/steam-cleaner.jpg",
      category: "Cleaning Machines",
      description: "Commercial steam cleaner for deep sanitization",
    },
    {
      id: 6,
      name: "Safety Equipment Bundle",
      price: 149.99,
      image: "/images/products/safety-kit.jpg",
      category: "Safety Equipment",
      description: "Complete safety gear for professional cleaning",
    },
  ];

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
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Slider */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-[#1B1F2D]">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide, index) => (
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
          {bannerSlides.map((_, index) => (
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
        {/* Filter Controls */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap items-center justify-end gap-4">
            {/* Search Bar */}
            <div className="w-full md:w-auto order-1 md:order-none">
              <div className="relative max-w-md md:w-[300px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cleaning equipment..."
                  className="w-full px-4 py-2 md:py-3 pl-10 md:pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Active Filter Tags */}
            {selectedCategory !== "All Products" && (
              <div className="flex items-center gap-2 order-3 md:order-none">
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All Products")}
                    className="hover:text-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Filter Dropdown */}
            <div className="relative filter-dropdown order-2 md:order-none">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors ml-auto"
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
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span>Filter by Category</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isFilterDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedCategory === category
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-2 md:mb-4">
                  <span className="text-xs md:text-sm font-medium text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <button className="w-full sm:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm md:text-base">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
