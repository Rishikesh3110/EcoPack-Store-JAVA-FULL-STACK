import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    setMessage(result.message);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card p-4">
            <h2 className="text-success mb-3">Login</h2>
            <p className="text-muted">Welcome back to EcoPack Store.</p>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" name="password" type="password" value={form.password} onChange={handleChange} required />
              </div>
              <button className="btn btn-success w-100" type="submit">Login</button>
            </form>
            <div className="mt-3 d-flex justify-content-between">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/signup">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;