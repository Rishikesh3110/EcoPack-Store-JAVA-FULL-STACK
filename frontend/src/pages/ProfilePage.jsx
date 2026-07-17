import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", address: user?.address || "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = updateProfile(form);
    setMessage(result.message);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: 70, height: 70, fontSize: 28 }}>
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <h3 className="mb-0">{user?.name}</h3>
                <p className="text-muted mb-0">{user?.email}</p>
              </div>
            </div>
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input className="form-control" name="address" value={form.address} onChange={handleChange} />
                </div>
              </div>
              <button className="btn btn-success mt-4" type="submit">Edit Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;