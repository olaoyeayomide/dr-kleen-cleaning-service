import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number | string;
}

interface ProductSliderProps {
  products: Product[];
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth;
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      // Initial check
      updateScrollButtons();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  };

  return (
    <div className="relative">
      {/* Left Navigation Button */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-r-lg shadow-lg p-2 hover:bg-white transition-colors"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Right Navigation Button */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-l-lg shadow-lg p-2 hover:bg-white transition-colors"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Products Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[calc(20%-16px)] min-w-[200px] snap-start"
          >
            <div
              className="bg-white rounded-lg p-4 relative group border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/shop/product/${product.id}`)}
            >
              {/* Wishlist Button */}
              <button
                className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to wishlist functionality will be implemented later
                  console.log("Add to wishlist clicked");
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Product Labels */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800">
                      ${formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating!
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
