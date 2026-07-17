function AdminDashboard() {
  return (
    <div>
      <h2 className="text-success mb-4">Admin Dashboard</h2>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card stat-card p-3">
            <h6>Total Products</h6>
            <h2 className="fw-bold">24</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card p-3">
            <h6>Total Orders</h6>
            <h2 className="fw-bold">18</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card p-3">
            <h6>Total Customers</h6>
            <h2 className="fw-bold">42</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card p-3">
            <h6>Revenue</h6>
            <h2 className="fw-bold">₹ 1.2L</h2>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-3">
            <h5 className="mb-3">Recent Orders</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ORD-1001</td>
                  <td>Asha Rao</td>
                  <td>Delivered</td>
                </tr>
                <tr>
                  <td>ORD-1002</td>
                  <td>Neha Singh</td>
                  <td>Processing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3">
            <h5 className="mb-3">Top Products</h5>
            <ul className="mb-0">
              <li>Eco Bags</li>
              <li>Paper Boxes</li>
              <li>Bamboo Utensils</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;