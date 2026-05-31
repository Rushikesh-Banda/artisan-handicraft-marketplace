import React,
{
  useEffect,
  useState,
  useContext,
} from 'react';

import {
  useParams,
  useNavigate
}
from 'react-router-dom';


import {
  getProductById,
  addReview,
  addReply,
  deleteReview,
  deleteReply,
} from "../api/productApi";

import {
  CartContext
} from '../context/CartContext';

import {
  AuthContext
} from '../context/AuthContext';

import Loader
from '../components/Loader';

import PageBackButton from "../components/PageBackButton";



const ProductDetails = () => {

  const { id } = useParams();

  const { addToCart } =
    useContext(CartContext);

  const { user } =
    useContext(AuthContext);


  const [product, setProduct] =
    useState(null);

  const [qty, setQty] =
    useState(1);

    const [reviewText,
  setReviewText] =
  useState("");
  
 const [rating,
  setRating] =
  useState(5);


    const [replyText, setReplyText] =
  useState({});

const [showReply, setShowReply] =
  useState({});


  // =====================================
  // FETCH PRODUCT
  // =====================================

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const data =
            await getProductById(id);

          setProduct(data.product);

        } catch (err) {

          console.error(err);
        }
      };

    fetchProduct();

  }, [id]);




  // =====================================
  // SUBMIT REVIEW
  // =====================================

  const submitReview =
  async () => {

    if (!user) {

      alert(
        "Please login first"
      );

      return;
    }

    if (!reviewText.trim()) {
  alert("Review cannot be empty");
  return;
}

    try {

      await addReview(

        product._id,

        {
          rating,
          comment:
            reviewText,
        }
      );

      const data =
        await getProductById(
          id
        );

      setProduct(
        data.product
      );

      setReviewText("");

      setRating(5);

      alert(
        "Review added successfully"
      );

    } catch (error) {

      alert(

        error?.response
          ?.data?.message ||

        "Failed to add review"
      );
    }
};

  // =====================================
  // LOADING
  // =====================================

  if (!product) {
    return <Loader />;
  }


  // =====================================
  // UI
  // =====================================

  return (
  <div
    className="container"
    style={{
      padding: "3rem 0",
    }}
  >

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start",
      }}
    >

        {/* IMAGE */}

        <div>

          <img

            src={product.image}

            alt={product.title}

            style={{
              width: '100%',
              borderRadius: '20px',
              objectFit: 'cover',
              height: '500px',
            }}
          />

        </div>


        {/* DETAILS */}

        <div>

          <h1
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
            }}
          >
            {product.title}
          </h1>


          <p
            style={{
              fontSize: '2rem',
              color:
                'var(--primary-color)',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            ₹{product.price}
          </p>


          <p
            style={{
              color:
                'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '2rem',
            }}
          >
            {product.description}
          </p>


          {/* PRODUCT INFO */}

          <div
            className="glass-card"
            style={{
              padding: '2rem',
              marginBottom: '2rem',
            }}
          >

            <p
              style={{
                marginBottom: '1rem',
              }}
            >
              <strong>Category:</strong>

              {' '}

              {product.category?.name}
            </p>


            <p
              style={{
                marginBottom: '1rem',
              }}
            >
              <strong>Rating:</strong>

⭐ {product.rating?.toFixed(1)}

{" "}
({product.numReviews} Reviews)
            </p>


            <p
              style={{
                marginBottom: '1rem',
              }}
            >
              <strong>Reviews:</strong>

              {' '}

              {product.numReviews}
            </p>


            <p>
              <strong>Status:</strong>

              {' '}

              {product.countInStock > 0
                ? 'In Stock'
                : 'Out of Stock'}
            </p>

          </div>


          {/* ADD TO CART */}

          {product.countInStock > 0 && (

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '3rem',
              }}
            >

              <select

                value={qty}

                onChange={(e) =>
                  setQty(
                    Number(e.target.value)
                  )
                }

                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  minWidth: '100px',
                }}
              >

                {[...Array(
                  Math.min(
                    product.countInStock,
                    10
                  )
                ).keys()].map(x => (

                  <option
                    key={x + 1}
                    value={x + 1}
                  >
                    {x + 1}
                  </option>
                ))}

              </select>


              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  if (!user) {
                    alert("Please login first to add products to your cart.");
                    window.location.href = "/login";
                    return;
                  }
                  addToCart(product._id, qty);
                }}
              >
                Add To Cart
              </button>

            </div>
          )}


          {/* WRITE REVIEW */}

          <div
            className="glass-card"
            style={{
              padding: "2rem",
              marginBottom: "3rem",
            }}
          >

            <h2
              style={{
                marginBottom: "1rem",
              }}
            >
              Write Review
            </h2>

            <div
  style={{
    marginBottom:
      "1rem",
  }}
>

  <label>
    Rating:
  </label>

  <select

    value={rating}

    onChange={(e) =>
      setRating(
        Number(
          e.target.value
        )
      )
    }

    style={{
      marginLeft:
        "10px",
      padding:
        "8px",
    }}
  >

    <option value={5}>
      ⭐⭐⭐⭐⭐
    </option>

    <option value={4}>
      ⭐⭐⭐⭐
    </option>

    <option value={3}>
      ⭐⭐⭐
    </option>

    <option value={2}>
      ⭐⭐
    </option>

    <option value={1}>
      ⭐
    </option>

  </select>

</div>

            <textarea

              placeholder="Write your review..."

              value={reviewText}

              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                height: "150px",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />

            <button

              className="btn btn-primary"

              onClick={submitReview}
            >
              Submit Review
            </button>

          </div>


          {/* CUSTOMER REVIEWS */}

          <div>

            <h2
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
              }}
            >
              Customer Reviews
            </h2>

           {product.reviews?.map((review) => (

  <div
    key={review._id}
    className="glass-card"
    style={{
      padding: "1.5rem",
      marginBottom: "1rem",
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>{review.name}</h3>

      <span
        style={{
          color: "#FFD700",
          fontWeight: "bold",
        }}
      >
        {"⭐".repeat(review.rating)}
      </span>
    </div>

    <p
      style={{
        marginTop: "10px",
        color: "#ddd",
      }}
    >
      {review.comment}
    </p>

    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
      }}
    >

      <button
        className="btn btn-primary"
        onClick={() =>
          setShowReply({
            ...showReply,
            [review._id]:
              !showReply[review._id],
          })
        }
      >
        Reply
      </button>

     {String(review.user) === String(user?._id) && (

        <button
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding:
              "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={async () => {

            await deleteReview(
              product._id,
              review._id
            );

            const data =
              await getProductById(
                id
              );

            setProduct(
              data.product
            );
          }}
        >
          Delete
        </button>

      )}

    </div>

    {showReply[review._id] && (

      <div
        style={{
          marginTop: "15px",
        }}
      >

        <input
          type="text"
          placeholder="Write reply..."
          value={
            replyText[
              review._id
            ] || ""
          }
          onChange={(e) =>
            setReplyText({
              ...replyText,
              [review._id]:
                e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />

        <button
          className="btn btn-primary"
          onClick={async () => {

  if (
    !replyText[review._id] ||
    !replyText[review._id].trim()
  ) {
    alert("Reply cannot be empty");
    return;
  }

  await addReply(
    product._id,
    review._id,
    replyText[review._id]
  );

  const data =
    await getProductById(id);

  setProduct(data.product);

  setReplyText({
    ...replyText,
    [review._id]: "",
  });
}}
        >
          Submit Reply
        </button>

      </div>

    )}

    {review.replies?.length >
      0 && (

      <div
        style={{
          marginTop: "15px",
          marginLeft: "20px",
        }}
      >

        {review.replies.map(
  (reply) => (

    <div
      key={reply._id}
      style={{
        padding: "10px",
        marginBottom: "10px",
        background:
          "rgba(255,255,255,0.05)",
        borderRadius: "8px",
      }}
    >

      <strong>
        {reply.name}
      </strong>

      <p>
        {reply.comment}
      </p>


     {String(reply.user) === String(user?._id) && (

  <button
    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "8px",
    }}

    onClick={async () => {

      await deleteReply(
        product._id,
        review._id,
        reply._id
      );

      const data =
        await getProductById(id);

      setProduct(
        data.product
      );
    }}
  >
    Delete Reply
  </button>

)}

    </div>

  )
)}

      </div>

    )}

  </div>

))}
</div>
</div>
      </div>
</div>)
}
           
          
 


export default ProductDetails;