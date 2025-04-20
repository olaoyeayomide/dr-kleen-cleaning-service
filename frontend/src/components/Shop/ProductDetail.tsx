import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number | string;
  specs?: { [key: string]: string };
  stock?: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<
    "description" | "specs" | "reviews"
  >("description");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}/`
        );
        setProduct(response.data);
        // Fetch related products (you'll need to implement this endpoint)
        const relatedResponse = await axios.get(
          `http://localhost:8000/api/products/related/${id}/`
        );
        setRelatedProducts(relatedResponse.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnail images would go here */}
            {[product.image, product.image, product.image, product.image].map(
              (img, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Product Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              {product.rating && (
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
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
                  <span className="ml-2 text-gray-600">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
              <span className="text-gray-500">SKU: {product.id}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="py-4 border-t border-b border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-800">
                ${formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <p className="text-green-600 text-sm mt-2">
              {product.stock && product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 border-r hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center py-2 focus:outline-none"
              />
              <button
                className="px-3 py-2 border-l hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
            onClick={() => {
              console.log("Add to cart clicked", { product, quantity });
            }}
          >
            Add to Cart
          </button>

          {/* Payment Options */}
          <div className="border-t pt-4">
            <p className="text-gray-600 mb-3">Secure Payment Options:</p>
            <div className="flex gap-2">
              <img src="/images/visa.png" alt="Visa" className="h-8" />
              <img
                src="/images/mastercard.png"
                alt="Mastercard"
                className="h-8"
              />
              <img
                src="/images/amex.png"
                alt="American Express"
                className="h-8"
              />
              <img src="/images/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg p-6 mb-12">
        <div className="flex border-b mb-4">
          <button
            className={`px-6 py-3 font-medium ${
              selectedTab === "description"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSelectedTab("description")}
          >
            Description
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              selectedTab === "specs"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSelectedTab("specs")}
          >
            Specifications
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              selectedTab === "reviews"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSelectedTab("reviews")}
          >
            Reviews
          </button>
        </div>

        <div className="prose max-w-none">
          {selectedTab === "description" && <div>{product.description}</div>}
          {selectedTab === "specs" && (
            <div className="grid grid-cols-2 gap-4">
              {product.specs &&
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-medium text-gray-700">{key}:</span>{" "}
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
            </div>
          )}
          {selectedTab === "reviews" && (
            <div>
              <p>Reviews coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/shop/product/${relatedProduct.id}`)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  {relatedProduct.name}
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  ${formatPrice(relatedProduct.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
