import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  bgColor: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No authentication token found");
        return;
      }

      const [productsRes, bannersRes] = await Promise.all([
        axios.get("http://localhost:8000/api/products/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:8000/api/banners/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      setProducts(productsRes.data);
      setBanners(bannersRes.data);
      setSuccessMessage("Data loaded successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((p) => p.id !== productId));
      setSuccessMessage("Product deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDeleteBanner = async (bannerId: number) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/banners/${bannerId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBanners(banners.filter((b) => b.id !== bannerId));
      setSuccessMessage("Banner deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting banner:", error);
      setErrorMessage("Failed to delete banner");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}

      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      {/* Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Products</h2>
          <span className="text-sm text-gray-500">
            Total Products: {products.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 relative group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm font-medium text-blue-600">
                  ${product.price}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Product"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banners Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Banners</h2>
          <span className="text-sm text-gray-500">
            Total Banners: {banners.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="border rounded-lg p-4 relative group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.subtitle}</p>
                <p className="text-sm font-medium text-blue-600">
                  {banner.discount}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: banner.bgColor }}
                  ></span>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Banner"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
