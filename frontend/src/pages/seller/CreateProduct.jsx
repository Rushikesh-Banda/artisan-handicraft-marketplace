import React,
{
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createProduct,
} from "../../api/productApi";


const CreateProduct = () => {

  const navigate =
    useNavigate();


  // ======================================
  // STATES
  // ======================================

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [image,
    setImage] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [countInStock,
    setCountInStock] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);


  // ======================================
  // SUBMIT
  // ======================================

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await createProduct({

          title,

          description,

          price,

          image,

          category,

          countInStock,
        });

        alert(
          "Product created successfully"
        );

        navigate(
          "/seller/dashboard"
        );

      } catch (error) {

        console.log(error);
        
        const resData = error?.response?.data;
        const errMsg = resData?.message || "Failed to create product";
        const detailedErr = resData?.error ? `\nDetails: ${resData.error}` : "";

        alert(errMsg + detailedErr);

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className="container"
      style={{
        padding: "4rem 0",
      }}
    >

      <div
        className="glass-card"
        style={{
          maxWidth: "700px",
          margin: "auto",
          padding: "2rem",
          borderRadius: "20px",
        }}
      >

        <h1
          style={{
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Add New Product
        </h1>


        <form
          onSubmit={submitHandler}
        >

          {/* TITLE */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Product Title
            </label>

            <input

              type="text"

              placeholder="Enter product title"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* DESCRIPTION */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Description
            </label>

            <textarea

              placeholder="Enter product description"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                minHeight: "120px",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* PRICE */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Price
            </label>

            <input

              type="number"

              placeholder="Enter price"

              value={price}

              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* IMAGE */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Image URL
            </label>

            <input

              type="text"

              placeholder="Paste image URL"

              value={image}

              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* CATEGORY */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Category Name
            </label>

            <input

              type="text"

              placeholder="Enter category name (e.g. Pottery)"

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* STOCK */}

          <div
            style={{
              marginBottom: "2rem",
            }}
          >

            <label>
              Stock Quantity
            </label>

            <input

              type="number"

              placeholder="Enter stock"

              value={countInStock}

              onChange={(e) =>
                setCountInStock(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "0.5rem",
              }}
            />

          </div>


          {/* BUTTON */}

          <button

            type="submit"

            className="btn btn-primary"

            disabled={loading}

            style={{
              width: "100%",
              padding: "1rem",
            }}
          >

            {loading

              ? "Creating Product..."

              : "Create Product"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateProduct;