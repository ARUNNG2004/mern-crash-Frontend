import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setToastMessage(message);
    setToastType(success ? 'success' : 'error');
    setShowToast(true);
  };

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setShowModal(false);
    setToastMessage(message);
    setToastType(success ? 'success' : 'error');
    setShowToast(true);
  };

  return (
    <Card className=" bg-dark mb-4 shadow-sm">
    <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body className="  d-flex justify-content-between align-items-center">
      <div className='card-header border border-white '>
        <Card.Title className=" card-title text-primary">{product.name}</Card.Title> {/* Set name color to primary */}
        <Card.Text className="card-text text-white">${product.price}</Card.Text> {/* Set price color to secondary */}
      </div>
      <div className="d-flex gap-2">
        <Button variant="primary" onClick={() => setShowModal(true)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
      </div>
    </Card.Body>
 {/* Modal for updating product */}
<Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  dialogClassName="modal-90w"
  aria-labelledby="update-product-modal"
  animation={true}
  className=''
>
  <Modal.Header closeButton className='bg-dark border-bottom border-secondary'>
    <Modal.Title id="update-product-modal" className="text-primary">
      <i className="bi bi-pencil-square text-primary"></i> Update Product
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="bg-dark ">
    <div className="mb-3 text-primary">
      <label htmlFor="productName" className="form-label ">Product Name</label>
      <input
        type="text"
        id="productName"
        placeholder="Enter product name"
        value={updatedProduct.name}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
        className="form-control form-control-lg bg-dark text-white border-secondary"
      />
    </div>

    <div className="mb-3 text-primary" >
      <label htmlFor="productPrice" className="form-label ">Price</label>
      <input
        type="number"
        id="productPrice"
        placeholder="Enter price"
        value={updatedProduct.price}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
        className="form-control form-control-lg bg-dark text-white border-secondary"
      />
    </div>

    <div className="mb-3 text-primary">
      <label htmlFor="productImage" className="form-label text-primary">Image URL</label>
      <input
        type="text"
        id="productImage"
        placeholder="Enter image URL"
        value={updatedProduct.image}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
        className="form-control form-control-lg bg-dark text-white border-secondary"
      />
    </div>
  </Modal.Body>

  <Modal.Footer className='bg-dark border-top border-secondary'>
    <Button
      variant="success"
      className="btn-lg"
      onClick={() => handleUpdateProduct(product._id)}
    >
      <i className="bi bi-check-circle"></i> Update
    </Button>

    <Button
      variant="secondary"
      className="btn-lg"
      onClick={() => setShowModal(false)}
    >
      <i className="bi bi-x-circle"></i> Cancel
    </Button>
  </Modal.Footer>
</Modal>
      {/* Toast for notifications */}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Body className={toastType === 'success' ? 'text-success' : 'text-danger'}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </Card>
  );
};

export default ProductCard;
