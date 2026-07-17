import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/ProductService";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      await loadProducts();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success mb-0">Manage Products</h2>
        <button className="btn btn-success" onClick={() => navigate("/add-product")}>Add Product</button>
      </div>
      <div className="card p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn btn-outline-success btn-sm me-2" onClick={() => navigate("/add-product", { state: { editingProduct: product } })}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;