import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productApi";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // FETCH PRODUCT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data && data.product) {
          setTitle(data.product.title || "");
          setDescription(data.product.description || "");
          setPrice(data.product.price || "");
          setImage(data.product.image || "");
          setCategory(data.product.category?.name || ""); // Pre-fill with category name
          setCountInStock(data.product.countInStock || "");
        } else {
          toast.error("Product not found");
          navigate("/seller/dashboard");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProduct(id, {
        title,
        description,
        price,
        image,
        category,
        countInStock,
      });
      toast.success("Product updated successfully");
      navigate("/seller/dashboard");
    } catch (error) {
      console.error(error);
      const resData = error?.response?.data;
      const errMsg = resData?.message || "Failed to update product";
      const detailedErr = resData?.error ? `\nDetails: ${resData.error}` : "";
      toast.error(errMsg + detailedErr);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h2>Loading product details...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div className="glass-card" style={{ maxWidth: "700px", margin: "auto", padding: "2rem", borderRadius: "20px" }}>
        <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>Edit Product</h1>

        <form onSubmit={submitHandler}>
          {/* TITLE */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Product Title</label>
            <input
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: "100%", minHeight: "120px", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* PRICE */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* IMAGE */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Paste image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* CATEGORY */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Category Name</label>
            <input
              type="text"
              placeholder="Enter category name (e.g. Pottery)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* STOCK */}
          <div style={{ marginBottom: "2rem" }}>
            <label>Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
              style={{ width: "100%", padding: "1rem", borderRadius: "10px", marginTop: "0.5rem" }}
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "1rem" }}>
            {loading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
