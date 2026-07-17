function ContactPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <h2 className="text-success mb-3">Contact EcoPack</h2>
            <p className="text-muted">Reach out for bulk orders, custom packaging, or partnership inquiries.</p>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" />
              </div>
            </div>
            <button className="btn btn-success mt-4">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
