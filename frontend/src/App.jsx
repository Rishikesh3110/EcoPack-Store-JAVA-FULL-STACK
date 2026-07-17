import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import { useAuth } from "./context/AuthContext";
import { getProducts } from "./services/ProductService";
import AboutPage from "./pages/AboutPage";
import AddProduct from "./pages/AddProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetails from "./pages/ProductDetails";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("ecopack-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("ecopack-wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("ecopack-orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem("ecopack-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("ecopack-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("ecopack-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Unable to load products", error);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id === id) {
          if (item.quantity === 1) return [];
          return [{ ...item, quantity: item.quantity - 1 }];
        }
        return [item];
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderData) => {
    const grandTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 120;
    const order = {
      id: `ORD-${Date.now()}`,
      customerName: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      deliveryMethod: orderData.deliveryMethod,
      paymentMethod: orderData.paymentMethod,
      items: cartItems,
      total: grandTotal,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <main className="pb-5">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} products={products} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/products" element={<Home addToCart={addToCart} products={products} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} placeOrder={placeOrder} />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage orders={orders} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute role="admin"><AddProduct /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard products={products} orders={orders} />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders orders={orders} updateOrderStatus={updateOrderStatus} />} />
            <Route path="customers" element={<AdminUsers />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;