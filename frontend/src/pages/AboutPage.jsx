function AboutPage() {
  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <h2 className="text-success fw-bold mb-3">About EcoPack</h2>
          <p className="text-muted">EcoPack Store is a premium sustainable packaging brand delivering eco-conscious bags, boxes, utensils, and courier solutions designed for modern businesses and environmentally responsible consumers.</p>
          <p className="text-muted">Every product is crafted to balance durability, style, and environmental care.</p>
        </div>
        <div className="col-lg-6">
          <div className="card p-4">
            <h4 className="fw-bold">Our Promise</h4>
            <ul className="mb-0">
              <li>Premium eco materials</li>
              <li>Thoughtful design</li>
              <li>Reliable delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
