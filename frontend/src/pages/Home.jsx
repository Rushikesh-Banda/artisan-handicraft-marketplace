import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";

const Home = () => {

  const { user } =
    useContext(AuthContext);

  const [welcomeText,
    setWelcomeText] =
    useState("Welcome back");

  useEffect(() => {

    const isNewUser =
      localStorage.getItem(
        "isNewUser"
      );

    if (isNewUser === "true") {

      setWelcomeText(
        "Welcome"
      );

      localStorage.removeItem(
        "isNewUser"
      );
    }

  }, []);

  return (

    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container"
        style={{
          textAlign: "center",
          maxWidth: "900px",
        }}
      >

        {user && (
          <p
            style={{
              marginBottom: "2rem",
              color: "#bbb",
              fontSize: "1.1rem",
            }}
          >
            {welcomeText}, {user.name} 
          </p>
        )}

        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "1.5rem",
            lineHeight: "1.2",
          }}
        >
          Discover{" "}
          <span className="text-gradient">
            Handcrafted
          </span>{" "}
          Masterpieces
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#c5c5c5",
            marginBottom: "3rem",
          }}
        >
          Support independent artisans and find
          unique handmade products crafted with
          passion and tradition.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/products"
            className="btn btn-primary"
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
            }}
          >
            Explore Products
          </Link>

          <Link
            to="/become-seller"
            className="btn btn-outline"
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
            }}
          >
            Become a Seller
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;