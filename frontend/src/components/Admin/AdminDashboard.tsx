import React, { useState, useEffect } from "react";
import axios from "axios";
import { login, getAuthHeader } from "../../services/auth";
import { Product, Banner } from "../../types";

const API_BASE_URL = "http://localhost:8000/api";

interface AdminUser {
  id: number;
  username: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    category: "",
    description: "",
    isNew: false,
    discount: 0,
    rating: 0,
    reviewCount: 0,
    stock: 0,
    specs: {},
  });
  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    discount: "",
    image: "",
    bgColor: "#ffffff",
  });
  const [newAdminUser, setNewAdminUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const [productsRes, bannersRes, adminUsersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products/`, { headers: getAuthHeader() }),
        axios.get(`${API_BASE_URL}/banners/`, { headers: getAuthHeader() }),
        axios.get(`${API_BASE_URL}/admin/users/`, { headers: getAuthHeader() }),
      ]);
      setProducts(productsRes.data);
      setBanners(bannersRes.data);
      setAdminUsers(adminUsersRes.data);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/create/`, newAdminUser, {
        headers: getAuthHeader(),
      });
      setSuccess("Admin user created successfully");
      setNewAdminUser({ username: "", email: "", password: "" });
      fetchData();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to create admin user");
    }
  };

  const handleDeleteAdminUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this admin user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/delete/${userId}/`, {
          headers: getAuthHeader(),
        });
        setSuccess("Admin user deleted successfully");
        fetchData();
      } catch (error: any) {
        setError(error.response?.data?.error || "Failed to delete admin user");
      }
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/password-reset/request/`, {
        email: resetEmail,
      });
      setSuccess("Password reset email sent");
      setResetEmail("");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to send reset email");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/`,
        newProduct,
        { headers: getAuthHeader() }
      );

      const productWithTimestamp = {
        ...response.data,
        addedAt: new Date().toISOString(),
      };

      setSuccess("Product added successfully");
      setNewProduct({
        name: "",
        price: 0,
        originalPrice: 0,
        image: "",
        category: "",
        description: "",
        isNew: false,
        discount: 0,
        rating: 0,
        reviewCount: 0,
        stock: 0,
        specs: {},
      });

      setProducts([productWithTimestamp, ...products]);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to add product");
      console.error("Error adding product:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <button
              onClick={() => setActiveTab("reset")}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("products")}
                className={`${
                  activeTab === "products"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("banners")}
                className={`${
                  activeTab === "banners"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Banners
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`${
                  activeTab === "users"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Admin Users
              </button>
            </nav>
          </div>

          {activeTab === "products" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-6 max-w-4xl">
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Product category"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                      placeholder="Product description"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Images</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Image URL"
                      required
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price
                      </label>
                      <input
                        type="number"
                        value={newProduct.originalPrice}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            originalPrice: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={newProduct.discount}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            discount: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Product Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.isNew}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              isNew: e.target.checked,
                            })
                          }
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Mark as New Product
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Ratings & Reviews
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        value={newProduct.rating}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            rating: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Reviews
                      </label>
                      <input
                        type="number"
                        value={newProduct.reviewCount}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            reviewCount: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Technical Specifications
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specifications (JSON format)
                    </label>
                    <textarea
                      value={JSON.stringify(newProduct.specs, null, 2)}
                      onChange={(e) => {
                        try {
                          const specs = JSON.parse(e.target.value);
                          setNewProduct({ ...newProduct, specs });
                        } catch (error) {
                          // Handle invalid JSON
                        }
                      }}
                      className="w-full px-3 py-2 border rounded-md font-mono"
                      rows={6}
                      placeholder='{"key": "value"}'
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Example: {"{"}"Processor": "M1", "RAM": "8GB"{"}"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Product
                  </button>
                </div>
              </form>

              {/* Product History Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Product History</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Added Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-16 w-16 object-cover rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              {product.isNew && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  New
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${product.price}
                              </div>
                              {product.originalPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  ${product.originalPrice}
                                </div>
                              )}
                              {(product.discount ?? 0) > 0 && (
                                <div className="text-xs text-red-500">
                                  -{product.discount}%
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {product.stock ?? 0}
                              </div>
                              {(product.stock ?? 0) <= 10 && (
                                <div className="text-xs text-red-500">
                                  Low Stock
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.addedAt
                                ? new Date(product.addedAt).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={async () => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this product?"
                                    )
                                  ) {
                                    try {
                                      await axios.delete(
                                        `${API_BASE_URL}/products/${product.id}/`,
                                        { headers: getAuthHeader() }
                                      );
                                      setSuccess(
                                        "Product deleted successfully"
                                      );
                                      const updatedProducts = products.filter(
                                        (p) => p.id !== product.id
                                      );
                                      setProducts(updatedProducts);
                                    } catch (error: any) {
                                      setError(
                                        error.response?.data?.error ||
                                          "Failed to delete product"
                                      );
                                    }
                                  }
                                }}
                                className="text-red-600 hover:text-red-900 mr-4"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "banners" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Banner</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await axios.post(
                      `${API_BASE_URL}/banners/`,
                      newBanner,
                      { headers: getAuthHeader() }
                    );

                    const bannerWithTimestamp = {
                      ...response.data,
                      addedAt: new Date().toISOString(),
                    };

                    setSuccess("Banner added successfully");
                    setNewBanner({
                      title: "",
                      subtitle: "",
                      discount: "",
                      image: "",
                      bgColor: "#ffffff",
                    });

                    setBanners([bannerWithTimestamp, ...banners]);
                  } catch (error: any) {
                    setError(
                      error.response?.data?.error || "Failed to add banner"
                    );
                    console.error("Error adding banner:", error);
                  }
                }}
                className="space-y-6 max-w-4xl"
              >
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Banner Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newBanner.title}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Banner title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={newBanner.subtitle}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            subtitle: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Banner subtitle"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Discount and Image */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Discount & Image
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Text
                      </label>
                      <input
                        type="text"
                        value={newBanner.discount}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            discount: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g., '50% OFF' or 'Special Offer'"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={newBanner.image}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, image: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Banner image URL"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Background Color */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Banner Style</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={newBanner.bgColor}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            bgColor: e.target.value,
                          })
                        }
                        className="h-10 w-20"
                      />
                      <span className="text-sm text-gray-500">
                        Selected color: {newBanner.bgColor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Banner
                  </button>
                </div>
              </form>

              {/* Banner History Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Banner History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {banners.map((banner) => (
                    <div
                      key={banner.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div
                        className="p-4"
                        style={{ backgroundColor: banner.bgColor }}
                      >
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {banner.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {banner.subtitle}
                        </p>
                        <p className="text-sm font-medium text-indigo-600 mt-2">
                          {banner.discount}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Added:{" "}
                          {banner.addedAt
                            ? new Date(banner.addedAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this banner?"
                                )
                              ) {
                                try {
                                  await axios.delete(
                                    `${API_BASE_URL}/banners/${banner.id}/`,
                                    { headers: getAuthHeader() }
                                  );
                                  setSuccess("Banner deleted successfully");
                                  const updatedBanners = banners.filter(
                                    (b) => b.id !== banner.id
                                  );
                                  setBanners(updatedBanners);
                                } catch (error: any) {
                                  setError(
                                    error.response?.data?.error ||
                                      "Failed to delete banner"
                                  );
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Add New Admin User</h2>
              <form onSubmit={handleCreateAdminUser} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={newAdminUser.username}
                    onChange={(e) =>
                      setNewAdminUser({
                        ...newAdminUser,
                        username: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newAdminUser.email}
                    onChange={(e) =>
                      setNewAdminUser({
                        ...newAdminUser,
                        email: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newAdminUser.password}
                    onChange={(e) =>
                      setNewAdminUser({
                        ...newAdminUser,
                        password: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Admin User
                </button>
              </form>

              <h2 className="text-xl font-semibold mb-4">
                Existing Admin Users
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border p-4 rounded shadow hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold">{user.username}</h4>
                    <p className="text-gray-600">{user.email}</p>
                    <button
                      onClick={() => handleDeleteAdminUser(user.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      Delete User
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reset" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
              <form onSubmit={handlePasswordReset} className="max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
