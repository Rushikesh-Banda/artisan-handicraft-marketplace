import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  resetPassword,
} from "../api/authApi";

const ForgotPassword = () => {

    const navigate =
  useNavigate();

  const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [confirmPassword,
  setConfirmPassword] =
  useState("");

  const submitHandler = async (e) => {

  e.preventDefault();

  if (
    password !== confirmPassword
  ) {

    alert(
      "Passwords do not match"
    );

    return;
  }

  try {

    await resetPassword(
      email,
      password
    );

    alert(
      "Password updated successfully"
    );

    navigate("/login");

  } catch (error) {

    alert(
      error?.response?.data?.message ||
      "Failed to update password"
    );
  }
};


  return (

    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "4rem 0",
      }}
    >

      <div
        className="glass-card"
        style={{
          padding: "3rem",
          width: "100%",
          maxWidth: "450px",
          borderRadius: "12px",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Reset Password
        </h2>

   <form
  onSubmit={submitHandler}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }}
>

  <input

    type="email"

    placeholder="Enter Email"

    value={email}

    onChange={(e) =>
      setEmail(
        e.target.value
      )
    }

    required

    style={{
      padding: "0.75rem",
      borderRadius: "8px",
    }}
  />

  <input

    type="password"

    placeholder="Enter New Password"

    value={password}

    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }

    required

    style={{
      padding: "0.75rem",
      borderRadius: "8px",
    }}
  />
          

          <input

            type="password"

            placeholder="Confirm Password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

            required

            style={{
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          />

          <button

            type="submit"

            className="btn btn-primary"
          >

            Update Password

          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;