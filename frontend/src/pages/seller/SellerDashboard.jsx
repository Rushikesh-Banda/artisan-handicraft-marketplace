import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSellerProducts } from "../../api/sellerApi";
import { deleteProduct } from "../../api/productApi";
import toast from "react-hot-toast";

const SellerDashboard = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ======================================
  // FETCH SELLER PRODUCTS
  // ======================================

  const fetchProducts = async () => {
    try {
      const data = await getSellerProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================================
  // DELETE PRODUCT
  // ======================================

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product");
      }
    }
  };

  return (

    <div className="container" style={{ padding: "3rem 0" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem" }}>Seller Dashboard</h1>
          <p>Manage your products and sales</p>
        </div>

        <Link to="/create-product">
          <button className="btn btn-primary">Add Product</button>
        </Link>
      </div>


      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        {/* TOTAL PRODUCTS */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2>Total Products</h2>
          <h1 style={{ fontSize: "3rem", marginTop: "1rem" }}>{products.length}</h1>
        </div>

        {/* TOTAL SALES */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2>Total Sales</h2>
          <h1 style={{ fontSize: "3rem", marginTop: "1rem" }}>₹0</h1>
        </div>

        {/* TOTAL ORDERS */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2>Total Orders</h2>
          <h1 style={{ fontSize: "3rem", marginTop: "1rem" }}>0</h1>
        </div>
      </div>


      {/* PRODUCTS */}
      <div>
        <h2 style={{ marginBottom: "2rem" }}>Your Products</h2>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "2rem" 
          }}>
            {products.map((product) => (
              <div key={product._id} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>

                {/* IMAGE */}
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                />

                {/* TITLE */}
                <h3 style={{ fontSize: "1.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</h3>

                {/* PRICE */}
                <p style={{ color: "var(--primary-color)", fontWeight: "bold", margin: "0.5rem 0" }}>
                  ₹{product.price}
                </p>

                {/* STOCK */}
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  Stock: {product.countInStock}
                </p>

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "auto" }}>
                  <Link to={`/edit-product/${product._id}`} style={{ flex: 1 }}>
                    <button className="btn btn-primary" style={{ width: "100%", padding: "0.5rem" }}>
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    style={{
                      flex: 1,
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#ef4444";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(239, 68, 68, 0.1)";
                      e.target.style.color = "#ef4444";
                    }}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SellerDashboard;