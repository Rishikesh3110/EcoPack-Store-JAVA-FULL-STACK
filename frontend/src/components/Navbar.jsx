import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ cartCount }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top" style={{ background: "linear-gradient(135deg, #2e7d32, #4caf50)" }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">🌿 EcoPack Store</NavLink>

        <div className="ms-auto d-flex align-items-center gap-2 flex-wrap">
          {!user ? (
            <>
              <NavLink className="btn btn-outline-light" to="/">Home</NavLink>
              <NavLink className="btn btn-outline-light" to="/products">Products</NavLink>
              <NavLink className="btn btn-outline-light" to="/categories">Categories</NavLink>
              <NavLink className="btn btn-outline-light" to="/about">About</NavLink>
              <NavLink className="btn btn-outline-light" to="/contact">Contact</NavLink>
              <NavLink className="btn btn-outline-light" to="/login">Login</NavLink>
              <NavLink className="btn btn-light text-success" to="/signup">Signup</NavLink>
              <NavLink className="btn btn-warning fw-semibold position-relative" to="/cart">🛒 {cartCount}</NavLink>
            </>
          ) : user.role === "admin" ? (
            <>
              <NavLink className="btn btn-outline-light" to="/admin">Dashboard</NavLink>
              <NavLink className="btn btn-outline-light" to="/admin/products">Products</NavLink>
              <NavLink className="btn btn-outline-light" to="/admin/orders">Orders</NavLink>
              <NavLink className="btn btn-outline-light" to="/admin/customers">Customers</NavLink>
              <button className="btn btn-light text-success" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-outline-light" to="/">Home</NavLink>
              <NavLink className="btn btn-outline-light" to="/products">Products</NavLink>
              <NavLink className="btn btn-outline-light" to="/wishlist">Wishlist</NavLink>
              <NavLink className="btn btn-outline-light" to="/orders">Orders</NavLink>
              <NavLink className="btn btn-outline-light" to="/profile">Profile</NavLink>
              <NavLink className="btn btn-warning fw-semibold position-relative" to="/cart">🛒 {cartCount}</NavLink>
              <button className="btn btn-light text-success" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;