import React,
{
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMyOrders,
} from "../api/orderApi";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";


const Profile = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logoutUser,
  } = useContext(
    AuthContext
  );

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const data =
            await getMyOrders();

          setOrders(data);

        } catch (error) {

          console.log(error);

        }
      };

    if (user) {
      fetchOrders();
    }

  }, [user]);

  if (!user) {

    return (

      <div
        className="container"
        style={{
          padding: "4rem 0",
          textAlign: "center",
        }}
      >

        <h1>Please Login First</h1>

        <p>
          You need to login to view your profile.
        </p>

        <Link
          to="/login"
          className="btn btn-primary"
        >
          Login
        </Link>

      </div>
    );
  }

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = () => {

    logoutUser();

    navigate("/");
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
          padding: "3rem",
          borderRadius: "25px",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >

          <div
            style={{
              fontSize: "4rem",
            }}
          >
            👤
          </div>

          <h1
            style={{
              fontSize: "3rem",
            }}
          >
            My Profile
          </h1>

        </div>


        {/* USER DETAILS */}

        <div
          style={{
            marginBottom: "3rem",
          }}
        >

          <p
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.2rem",
            }}
          >

            <strong>Name:</strong>
            {" "}
            {user?.name}

          </p>


          <p
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.2rem",
            }}
          >

            <strong>Email:</strong>
            {" "}
            {user?.email}

          </p>


          <p
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.2rem",
            }}
          >

            <strong>Role:</strong>
            {" "}
            {user?.role}

          </p>


          {/* ADDRESS */}

          <p
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.2rem",
            }}
          >

          </p>

        </div>


        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >

          {/* RETURN HOME */}

          <Link to="/">

            <button
              className="btn btn-primary"
            >
              Return Home
            </button>

          </Link>


          {/* SELLER DASHBOARD */}

          {user?.role ===
            "artisan" && (

            <Link
              to="/seller/dashboard"
            >

              <button
                className="btn btn-primary"
              >
                Seller Dashboard
              </button>

            </Link>

          )}


          {/* LOGOUT */}

          <button

            onClick={handleLogout}

            style={{
              background: "red",
              color: "white",
              border: "none",
              padding:
                "0.9rem 1.5rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>

        </div>


        {/* ORDERS */}

        <div>

          <h2
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
            }}
          >
            My Orders
          </h2>


          {orders.length === 0 ? (

            <p>
              No orders found
            </p>

          ) : (

            orders.map(
              (order) => (

                <div

                  key={order.id}

                  style={{
                    padding: "1.5rem",
                    marginBottom:
                      "1.5rem",
                    borderRadius:
                      "15px",
                    background:
                      "rgba(255,255,255,0.05)",
                  }}
                >

                  <h3>
  {order.orderItems?.[0]?.name ||
    "Product"}
</h3>

<p>
  Order ID:
  {" "}
  {order._id}
</p>

<p>
  Status:
  {" "}
  {order.status}
</p>

<p>
  Total:
  {" "}
  ₹{order.totalPrice}
</p>

<p>
  Payment:
  {" "}
  {order.isPaid
    ? "Paid"
    : "Pending"}
</p>
                </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;