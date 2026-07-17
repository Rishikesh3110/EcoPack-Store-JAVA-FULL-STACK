import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/ProductService";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await getProducts();
      const items = response.data;
      const current = items.find((item) => String(item.id) === String(id));
      setProduct(current);
      setRelated(items.filter((item) => item.category === current?.category && item.id !== current?.id).slice(0, 3));
    };
    load();
  }, [id]);

  if (!product) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80" className="img-fluid rounded-4 shadow" alt={product.name} />
        </div>
        <div className="col-lg-6">
          <span className="badge bg-success-subtle text-success-emphasis mb-3">{product.category}</span>
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h3 className="text-success mb-3">₹ {product.price}</h3>
          <p><strong>Stock:</strong> {product.stock}</p>
          <div className="d-flex gap-2 mb-4">
            <input className="form-control w-25" type="number" defaultValue="1" min="1" />
            <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
          <div className="card p-3">
            <h5>Specifications</h5>
            <ul>
              <li>Premium eco-friendly material</li>
              <li>Durable and reusable</li>
              <li>Ideal for everyday use</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="fw-bold mb-3">Related Products</h3>
        <div className="row">
          {related.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card p-3">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.description}</p>
                <button className="btn btn-outline-success btn-sm" onClick={() => navigate(`/product/${item.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;