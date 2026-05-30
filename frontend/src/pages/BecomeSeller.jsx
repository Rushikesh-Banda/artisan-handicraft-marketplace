import React,
{
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  becomeSeller,
} from "../api/sellerApi";


const BecomeSeller = () => {

  const navigate =
    useNavigate();

  const { user, updateUser } = useContext(AuthContext);

  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  if (
    user?.isSeller ||
    user?.role === "artisan"
  ) {

    navigate("/seller/dashboard");
  }

}, [user, navigate]);

  // ======================================
  // SUBMIT
  // ======================================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await becomeSeller({
        shopName,
        bio,
        phone,
        address,
      });

      // Update global context so Navbar reacts immediately
      updateUser({ role: "artisan", isSeller: true });

      alert("Seller account created successfully");
      navigate("/seller/dashboard");

    } catch (error) {
      console.log(error);

      const errorMsg = error?.response?.data?.message || "Failed to become seller";
      
      // If the user was already a seller on the backend but the frontend didn't know, resync them
      if (errorMsg === "Already seller account") {
        updateUser({ role: "artisan", isSeller: true });
        alert("You already have a seller account!");
        navigate("/seller/dashboard");
      } else {
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (
  user?.isSeller ||
  user?.role === "artisan"
) {
  return null;
}

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
          Become a Seller
        </h1>


        <form
          onSubmit={submitHandler}
        >

          {/* SHOP NAME */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Shop Name
            </label>

            <input

              type="text"

              placeholder="Enter shop name"

              value={shopName}

              onChange={(e) =>
                setShopName(
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


          {/* BIO */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Seller Bio
            </label>

            <textarea

              placeholder="Tell about your shop"

              value={bio}

              onChange={(e) =>
                setBio(
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


          {/* PHONE */}

          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >

            <label>
              Phone Number
            </label>

            <input

              type="text"

              placeholder="Enter phone number"

              value={phone}

              onChange={(e) =>
                setPhone(
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


          {/* ADDRESS */}

          <div
            style={{
              marginBottom: "2rem",
            }}
          >

            <label>
              Address
            </label>

            <textarea

              placeholder="Enter address"

              value={address}

              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }

              required

              style={{
                width: "100%",
                minHeight: "100px",
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
              ? "Creating Seller Account..."
              : "Become Seller"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default BecomeSeller;