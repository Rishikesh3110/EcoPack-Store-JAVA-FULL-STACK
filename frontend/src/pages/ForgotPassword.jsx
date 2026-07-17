function ForgotPassword() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card p-4">
            <h2 className="text-success mb-3">Reset Password</h2>
            <p className="text-muted">We will send recovery instructions to your email.</p>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" placeholder="Enter your registered email" />
            </div>
            <button className="btn btn-success w-100">Send Reset Link</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
