import React, { useState } from 'react';
import '../CreatePage.css'; // Import your CSS file for styles
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Alert state to show custom messages
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "alert-success", // Can be 'alert-success', 'alert-danger', etc.
  });

  const { createProduct } = useProductStore();

  // Handle adding a new product
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      setAlert({ show: true, message, variant: "alert-danger" }); // Show error alert
    } else {
      setAlert({ show: true, message, variant: "alert-success" }); // Show success alert
      // Clear input fields after successful submission
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Create New Product</h1>
      {alert.show && (
        <div className={`alert ${alert.variant}`}>
          <span onClick={() => setAlert({ ...alert, show: false })} className="closebtn">&times;</span>
          {alert.message}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            id="productPrice"
            placeholder="Enter price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Image URL</label>
          <input
            type="text"
            id="productImage"
            placeholder="Enter image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btna w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};


export default CreatePage;
