import { useNavigate } from "react-router-dom";
import ecoBag from "../assets/products/eco-bag.jpg";
import paperBox from "../assets/products/paper-box.jpg";
import arecaPlate from "../assets/products/areca-plate.jpg";
import garbageBag from "../assets/products/garbage-bag.jpg";
import courierCover from "../assets/products/courier-cover.jpg";
import defaultPlaceholder from "../assets/products/default-eco-placeholder.svg";

function ProductCard({ product, addToCart, wishlist, toggleWishlist, onEdit, onDelete, isAdmin }) {
  const navigate = useNavigate();
  const categoryIcons = {
    "Eco Bags": "👜",
    "Paper Bags": "🛍️",
    "Bamboo Utensils": "🍽️",
    "Food Boxes": "📦",
    "Paper Cups": "☕",
    "Courier Covers": "📮",
    "Compostable Garbage Bags": "🗑️",
  };

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

  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 product-card position-relative overflow-hidden">
        <button className="btn btn-light btn-sm wishlist-btn" onClick={() => toggleWishlist(product)}>
          {isSaved ? "♥" : "♡"}
        </button>
        <img src={imageSrc} className="card-img-top" alt={product.name} style={{ height: "220px", objectFit: "cover" }} />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-success-subtle text-success-emphasis">{product.category}</span>
            <span className="fs-4">{categoryIcons[product.category] || "🌿"}</span>
          </div>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-success mb-0">₹ {product.price}</h4>
            <small className="text-muted">Stock: {product.stock}</small>
          </div>
          <div className="d-flex gap-2 flex-wrap mb-3">
            {!isAdmin && (
              <>
                <button className="btn btn-outline-success btn-sm" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
              </>
            )}
            {isAdmin && (
              <>
                <button className="btn btn-outline-success btn-sm" onClick={() => onEdit(product)}>Edit</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(product.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;