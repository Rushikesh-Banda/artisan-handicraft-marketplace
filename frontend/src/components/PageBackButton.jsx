import React from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const PageBackButton = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const hidePages = [
    "/",
    "/login",
    "/register",
  ];

  if (
    hidePages.includes(location.pathname)
  ) {
    return null;
  }

  return (

    <div
      style={{
        padding: "1rem 2rem",
      }}
    >

      <button

        onClick={() => {

          if (
            location.pathname === "/seller/dashboard"
          ) {
            navigate("/");
            return;
          }

          if (
            location.pathname === "/create-product"
          ) {
            navigate("/seller/dashboard");
            return;
          }

          if (
            location.pathname.startsWith("/edit-product/")
          ) {
            navigate("/seller/dashboard");
            return;
          }

          navigate(-1);

        }}

        style={{
          background: "#1e293b",
          color: "white",
          border: "1px solid #6366f1",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ←
      </button>

    </div>

  );
};

export default PageBackButton;