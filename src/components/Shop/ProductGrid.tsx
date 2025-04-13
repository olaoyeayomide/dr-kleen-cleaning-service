import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 11 Pro Case",
    price: 29.99,
    image: "/images/products/iphone-case-1.jpg",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 199.99,
    image: "/images/products/smart-watch-1.jpg",
  },
  // Add more products as needed
];

export const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                <a href={`/product/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
