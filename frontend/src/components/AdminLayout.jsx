import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-lg-2 sidebar p-3">
          <h4 className="mb-4">EcoPack Admin</h4>
          <nav className="d-flex flex-column gap-2">
            <NavLink className="nav-link" to="/admin">Dashboard</NavLink>
            <NavLink className="nav-link" to="/admin/products">Products</NavLink>
            <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
            <NavLink className="nav-link" to="/admin/customers">Customers</NavLink>
            <button className="btn btn-light mt-3" onClick={logout}>Logout</button>
          </nav>
        </div>

        <div className="col-lg-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
