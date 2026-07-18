import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import ecoBag from "../assets/products/eco-bag.jpg";
import paperBox from "../assets/products/paper-box.jpg";
import arecaPlate from "../assets/products/areca-plate.jpg";
import garbageBag from "../assets/products/garbage-bag.jpg";
import courierCover from "../assets/products/courier-cover.jpg";
import defaultPlaceholder from "../assets/products/default-eco-placeholder.svg";

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

  const imageMap = {
    "eco cotton bag": ecoBag,
    "eco bag": ecoBag,
    "paper food box": paperBox,
    "food box": paperBox,
    "areca plate pack": arecaPlate,
    "areca plate": arecaPlate,
    "compostable garbage bags": garbageBag,
    "garbage bag": garbageBag,
    "eco courier cover": courierCover,
    "courier cover": courierCover,
  };

  const normalizedName = (product?.name || "").trim().toLowerCase();
  const normalizedCategory = (product?.category || "").trim().toLowerCase();
  const imageSrc = imageMap[normalizedName] || imageMap[normalizedCategory] || defaultPlaceholder;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <img src={imageSrc} className="img-fluid rounded-4 shadow" alt={product.name} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
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