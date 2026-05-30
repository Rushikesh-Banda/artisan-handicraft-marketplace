import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  login,
  register,
  logout,
} from '../api/authApi';

export const AuthContext =
  createContext();


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);


  // =====================================
  // LOAD USER FROM LOCAL STORAGE
  // =====================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

      if (parsedUser.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${parsedUser.token}`;
      }
    }

  }, []);


  // =====================================
  // LOGIN USER
  // =====================================

  const loginUser =
    async (userData) => {

      try {

        // login() returns { success, user: { _id, name, email, role, token } }
        const data = await login(userData);

        const loggedInUser = data.user;

        // SAVE TO LOCALSTORAGE
        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        // UPDATE STATE
        setUser(loggedInUser);

        // SET AXIOS DEFAULT HEADER
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loggedInUser.token}`;

        return loggedInUser;

      } catch (error) {
        console.error(error);
        throw error;
      }
    };


  // =====================================
  // REGISTER USER
  // =====================================

  const registerUser =
    async (userData) => {

      try {

        // register() returns { success, user: { _id, name, email, role, token } }
        const data = await register(userData);

        const registeredUser = data.user;

        // SAVE
        localStorage.setItem(
          "user",
          JSON.stringify(registeredUser)
        );

        localStorage.setItem("isNewUser", "true");

        // UPDATE STATE
        setUser(registeredUser);

        // SET TOKEN
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${registeredUser.token}`;

        return registeredUser;

      } catch (error) {
        console.error(error);
        throw error;
      }
    };


  // =====================================
  // LOGOUT USER
  // =====================================

  const logoutUser =
    async () => {

      await logout();

      localStorage.removeItem("user");

      setUser(null);

      delete axios.defaults.headers.common[
        "Authorization"
      ];
    };


  // =====================================
  // UPDATE USER
  // =====================================

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};