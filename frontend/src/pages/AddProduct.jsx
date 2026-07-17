import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../services/ProductService";

function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProduct = location.state?.editingProduct;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Eco Bags",
    stock: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "Eco Bags",
        stock: editingProduct.stock || "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await addProduct(payload);
    }

    navigate("/");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card form-card p-4">
            <h2 className="mb-3 text-success">{editingProduct ? "Update Product" : "Add New Product"}</h2>
            <p className="text-muted">Create or update eco-friendly items for EcoPack Store.</p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Product Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                    <option>Eco Bags</option>
                    <option>Paper Bags</option>
                    <option>Bamboo Utensils</option>
                    <option>Food Boxes</option>
                    <option>Paper Cups</option>
                    <option>Courier Covers</option>
                    <option>Compostable Garbage Bags</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Price</label>
                  <input
                    className="form-control"
                    name="price"
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Stock</label>
                  <input
                    className="form-control"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-success" type="submit">
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
