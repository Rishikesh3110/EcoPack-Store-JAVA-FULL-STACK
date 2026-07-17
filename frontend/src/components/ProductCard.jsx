import { useNavigate } from "react-router-dom";

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

  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 product-card position-relative overflow-hidden">
        <button className="btn btn-light btn-sm wishlist-btn" onClick={() => toggleWishlist(product)}>
          {isSaved ? "♥" : "♡"}
        </button>
        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80" className="card-img-top" alt={product.name} style={{ height: "220px" }} />
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