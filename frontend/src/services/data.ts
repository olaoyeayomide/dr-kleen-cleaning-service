import axios from "axios";
import { getAuthHeader } from "./auth";
import { Product, Banner } from "../types";

const API_BASE_URL = "http://localhost:8000/api";

// Initial data
const initialProducts = [
  {
    id: 1,
    name: "Professional Floor Scrubber",
    price: 1299.99,
    image: "https://i.ibb.co/ykT2qjZ/side-view-man-cleaning-window.jpg",
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
];

const initialBanners = [
  {
    title: "Best Deal Online on Cleaning Equipment",
    subtitle: "PROFESSIONAL CLEANING TOOLS",
    discount: "UP to 60% OFF",
    image: "/images/banners/cleaning-equipment.png",
    bgColor: "#1B1F2D",
  },
  {
    title: "New Arrivals in Store",
    subtitle: "INDUSTRIAL VACUUM CLEANERS",
    discount: "UP to 40% OFF",
    image: "/images/banners/vacuum-cleaner.png",
    bgColor: "#1B1F2D",
  },
];

// Initialize localStorage with default data if empty
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(initialProducts));
}

if (!localStorage.getItem("banners")) {
  localStorage.setItem("banners", JSON.stringify(initialBanners));
}

export const getProducts = async (): Promise<Product[]> => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const getBanners = async (): Promise<Banner[]> => {
  const banners = localStorage.getItem("banners");
  return banners ? JSON.parse(banners) : [];
};

export const addProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const products = await getProducts();
  const newProduct = {
    ...product,
    id: products.length + 1,
  };
  localStorage.setItem("products", JSON.stringify([...products, newProduct]));
  return newProduct;
};

export const addBanner = async (banner: Banner): Promise<Banner> => {
  const banners = await getBanners();
  localStorage.setItem("banners", JSON.stringify([...banners, banner]));
  return banner;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const products = await getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProducts));
};

export const deleteBanner = async (title: string): Promise<void> => {
  const banners = await getBanners();
  const filteredBanners = banners.filter((b) => b.title !== title);
  localStorage.setItem("banners", JSON.stringify(filteredBanners));
};
