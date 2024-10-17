import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Validate input
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields." };
    }

    try {
        const res = await fetch("/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Failed to create product." };
        }

        const data = await res.json();

        // Update the state with the new product
        set((state) => ({
            products: [...state.products, data], // Assuming 'data' contains the created product
        }));

        return { success: true, message: "Product created successfully", product: data };
    } catch (error) {
        return { success: false, message: error.message || "An error occurred." };
    }
},
  fetchProducts: async () => {
    try {
      const res = await fetch("https://mern-crash-baken.onrender.com/api/products/")
      console.log(" All the products: ", res);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      if (!data || !data.data) {
        throw new Error("Invalid response from API");
      }
      set({ products: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await res.json();
      if (!data || !data.success) {
        throw new Error("Invalid response from API");
      }
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to delete product" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch(`/api/products/${pid}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(updatedProduct),
      });   console.log("updated");
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      const data = await res.json();
      if (!data || !data.success) {
        throw new Error("Invalid response from API");
      }
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));

export default useProductStore;
