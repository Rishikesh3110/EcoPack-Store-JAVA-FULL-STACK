function HeroSection() {
  return (
    <section className="hero-banner p-5 p-lg-6">
      <div className="hero-overlay p-4 p-lg-5 rounded-4">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <span className="badge bg-warning text-dark mb-3">Premium Eco Packaging</span>
            <h1 className="display-4 fw-bold mb-3">Beautiful packaging made for a greener planet.</h1>
            <p className="lead mb-4">
              Discover premium eco bags, paper boxes, compostable covers, and modern sustainable essentials for your brand.
            </p>
            <a className="btn btn-light btn-lg fw-semibold" href="#products-section">
              Shop Now
            </a>
          </div>
          <div className="col-lg-5">
            <div className="bg-white text-dark p-4 rounded-4 shadow">
              <h5 className="fw-bold mb-3">Why EcoPack?</h5>
              <ul className="mb-0">
                <li>100% eco-conscious materials</li>
                <li>Elegant, premium design</li>
                <li>Fast delivery and easy checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
