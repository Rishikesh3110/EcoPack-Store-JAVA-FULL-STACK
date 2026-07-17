function WishlistPage({ wishlist, addToCart, toggleWishlist }) {
  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">Wishlist</h2>
      <div className="row g-4">
        {wishlist.length === 0 ? (
          <div className="col-12">
            <div className="card p-4 text-center">
              <h4>Your wishlist is empty.</h4>
            </div>
          </div>
        ) : (
          wishlist.map((item) => (
            <div className="col-lg-4" key={item.id}>
              <div className="card p-3">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success btn-sm" onClick={() => addToCart(item)}>Add to Cart</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => toggleWishlist(item)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
