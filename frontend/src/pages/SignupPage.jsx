import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = signup(form);
    setMessage(result.message);

    if (result.success) {
      try {
        await axios.post("http://localhost:8080/email/signup", {
          name: form.name,
          email: form.email,
        });

        console.log("Welcome email sent successfully.");
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }

      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card p-4">
            <h2 className="text-success mb-3">Create Account</h2>
            <p className="text-muted">
              Join EcoPack Store for premium sustainable shopping.
            </p>

            {message && (
              <div className="alert alert-info">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">
                Create Account
              </button>
            </form>

            <div className="mt-3 text-center">
              <Link to="/login">Already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;