// Removed all WordPress integration code. Only fallback data remains.

const fallbackProducts = [
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
];

const fallbackBanners = [
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

export const getProducts = async () => fallbackProducts;
export const getBanners = async () => fallbackBanners;
