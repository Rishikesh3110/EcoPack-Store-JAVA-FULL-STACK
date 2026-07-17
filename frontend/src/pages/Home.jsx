import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { deleteProduct } from "../services/ProductService";
import "../styles/Home.css";

const categories = [
  "All",
  "Eco Bags",
  "Paper Bags",
  "Bamboo Utensils",
  "Food Boxes",
  "Paper Cups",
  "Courier Covers",
  "Compostable Garbage Bags",
];

function Home({ addToCart, products, wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (lowerSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearch) ||
          product.category.toLowerCase().includes(lowerSearch) ||
          product.description.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredProducts(result);
  }, [search, activeCategory, products]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      window.location.reload();
    }
  };

  const featuredCount = useMemo(() => filteredProducts.length, [filteredProducts]);

  return (
    <>
      <div className="container py-4">
        <HeroSection />

        <div className="row mt-5 mb-4">
          <div className="col-lg-4">
            <h3 className="fw-bold">Featured Categories</h3>
            <p className="text-muted">Choose from premium sustainable packaging essentials.</p>
          </div>
          <div className="col-lg-8">
            <div className="row text-center">
              {categories.filter((item) => item !== "All").map((category) => (
                <div className="col-6 col-md-4 mb-3" key={category}>
                  <div className={`category ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>
                    {category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card p-4 stat-card">
              <h5 className="fw-bold">Why Choose Us</h5>
              <p className="text-muted mb-0">Sustainable packaging that looks premium and performs better.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 stat-card">
              <h5 className="fw-bold">Fast Shipping</h5>
              <p className="text-muted mb-0">Reliable delivery across India for your eco-friendly orders.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 stat-card">
              <h5 className="fw-bold">Great Support</h5>
              <p className="text-muted mb-0">Our support team helps you find the right packaging solution.</p>
            </div>
          </div>
        </div>

        <div className="search-box mb-4">
          <input className="form-control form-control-lg" placeholder="Search eco-friendly products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3" id="products-section">
          <h3 className="fw-bold">Popular Products</h3>
          <span className="text-muted">{featuredCount} items found</span>
        </div>

        <div className="row">
          {filteredProducts.length === 0 ? (
            <div className="col-12">
              <div className="empty-state">
                <h4>No products match your search.</h4>
                <p>Try a different keyword or add a new sustainable product.</p>
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                isAdmin={user?.role === "admin"}
                onEdit={(item) => navigate("/add-product", { state: { editingProduct: item } })}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div className="row mt-5 g-4">
          <div className="col-lg-6">
            <div className="card p-4">
              <h4 className="fw-bold mb-3">Customer Reviews</h4>
              <p className="text-muted">“The quality of their compostable bags is outstanding. Premium feel and excellent service.”</p>
              <p className="fw-semibold">- Nisha, Mumbai</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card p-4">
              <h4 className="fw-bold mb-3">Newsletter</h4>
              <p className="text-muted">Stay updated with our latest eco-friendly packaging launches.</p>
              <div className="input-group">
                <input className="form-control" placeholder="Your email" />
                <button className="btn btn-success">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;