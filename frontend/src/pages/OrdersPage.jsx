function OrdersPage({ orders }) {
  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">My Orders</h2>
      <div className="card p-4">
        {orders.length === 0 ? (
          <p className="text-muted mb-0">No orders placed yet.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Placed Date</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.items.length}</td>
                  <td>₹ {order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
