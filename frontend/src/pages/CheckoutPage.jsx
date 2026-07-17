import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage({ cartItems, placeOrder }) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("Standard Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + 120;

  const handleCheckout = (e) => {
    e.preventDefault();
    const order = placeOrder({ customerName, phone, address, deliveryMethod, paymentMethod });
    navigate("/order-success", { state: { customerName: order.customerName } });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <h2 className="text-success mb-3">Checkout</h2>
            <p className="text-muted">Complete your order with a premium delivery experience.</p>

            <form onSubmit={handleCheckout}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Your Name</label>
                  <input className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Delivery Address</label>
                  <textarea className="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Delivery Method</label>
                  <select className="form-select" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                    <option>Standard Delivery</option>
                    <option>Express Delivery</option>
                    <option>Pickup</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option>Cash on Delivery</option>
                    <option>Dummy UPI</option>
                  </select>
                </div>
              </div>

              <div className="border rounded p-3 mt-4">
                <h5>Order Summary</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹ {item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between"><span>Subtotal</span><span>₹ {subtotal}</span></div>
                <div className="d-flex justify-content-between"><span>Tax</span><span>₹ {tax.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between"><span>Delivery</span><span>₹ 120</span></div>
                <div className="d-flex justify-content-between fw-bold mt-2"><span>Grand Total</span><span>₹ {total.toFixed(2)}</span></div>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
