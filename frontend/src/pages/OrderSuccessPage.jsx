import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const customerName = location.state?.customerName || "Customer";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card p-5 text-center">
            <h1 className="text-success mb-3">Order Placed Successfully</h1>
            <p className="lead">Thank you for choosing EcoPack Store</p>
            <p className="text-muted">Hi {customerName}, your eco-friendly order is confirmed. Our team will prepare it shortly.</p>
            <button className="btn btn-success mt-3" onClick={() => navigate("/orders")}>View My Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
