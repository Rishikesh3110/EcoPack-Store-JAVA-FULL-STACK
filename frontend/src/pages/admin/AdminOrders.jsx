function AdminOrders({ orders = [], updateOrderStatus }) {
  const statuses = ["Processing", "Packed", "Shipped", "Delivered", "Cancelled"];

  return (
    <div>
      <h2 className="text-success mb-4">Manage Orders</h2>
      <div className="card p-3">
        {orders.length === 0 ? (
          <p className="text-muted mb-0">No orders yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                      <div className="small text-muted">{new Date(order.createdAt).toLocaleString()}</div>
                    </td>
                    <td>
                      <div>{order.customerName || "Guest Customer"}</div>
                      <div className="small text-muted">{order.phone || "-"}</div>
                    </td>
                    <td>{order.items?.length || 0}</td>
                    <td>₹ {order.total}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={order.status}
                        onChange={(e) => updateOrderStatus?.(order.id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;