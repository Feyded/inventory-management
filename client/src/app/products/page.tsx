"use client";

import { useState } from "react";
import { SearchIcon, PlusCircleIcon } from "lucide-react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import { useCreateProductsMutation, useGetProductsQuery } from "@/state/api";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductsMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
      await createProduct(productData);
  }

  if (isLoading) {
    return <div className="py-4">Loading</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white focus:outline-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 py-2 px-4"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 !text-gray-200 mr-2" />
          Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-800 font-semibold">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.price.toFixed(2)}
                </p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
