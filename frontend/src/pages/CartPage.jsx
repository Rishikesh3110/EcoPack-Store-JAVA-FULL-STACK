import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="card cart-card p-4 text-center">
          <h4>Your cart is empty.</h4>
          <p className="text-muted">Add a few eco-friendly essentials to get started.</p>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card cart-card p-3">
              {cartItems.map((item) => (
                <div className="d-flex justify-content-between align-items-center border-bottom py-3" key={item.id}>
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted">₹ {item.price}</p>
                    <p className="mb-0 text-success">Subtotal: ₹ {item.price * item.quantity}</p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button className="btn btn-outline-success btn-sm" onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card cart-card p-4">
              <h4 className="mb-3">Order Summary</h4>
              <div className="d-flex justify-content-between">
                <span>Items</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Total</span>
                <span className="fw-bold">₹ {total}</span>
              </div>
              <button className="btn btn-success w-100 mt-4" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
