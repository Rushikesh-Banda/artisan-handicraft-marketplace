import React, {
  useState,
  useContext
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  CartContext
} from '../context/CartContext';

import {
  createOrder
} from '../api/orderApi';


const Checkout = () => {

  const { cart } =
    useContext(CartContext);

  const navigate =
    useNavigate();

  const [address,
    setAddress] =
    useState('');

  const [city,
    setCity] =
    useState('');

  const [postalCode,
    setPostalCode] =
    useState('');

  const [country,
    setCountry] =
    useState('');

  const [paymentMethod,
    setPaymentMethod] =
    useState(
      "Cash On Delivery"
    );


  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const orderItems =
          cart.items.map(
            item => ({

              name:
                item.product.title,

              qty:
                item.quantity,

              image:
                item.product.image,

              price:
                item.product.price,

              product:
                item.product._id

            })
          );

        const itemsPrice =
          orderItems.reduce(

            (acc, item) =>

              acc +
              item.price *
              item.qty,

            0
          );

        const taxPrice =
          0.15 *
          itemsPrice;

        const shippingPrice =
          itemsPrice > 100
            ? 0
            : 10;

        const totalPrice =
          itemsPrice +
          taxPrice +
          shippingPrice;


        await createOrder({

          orderItems,

          shippingAddress: {

            address,

            city,

            postalCode,

            country,

          },

          paymentMethod,

          itemsPrice,

          taxPrice,

          shippingPrice,

          totalPrice,

        });

        alert(
          "Order placed successfully"
        );

        navigate(
          "/orders"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to place order"
        );
      }
    };


  return (

    <div
      className="container"
      style={{
        padding: '3rem 0',
        maxWidth: '600px'
      }}
    >

      <h2>
        Checkout - Shipping Details
      </h2>


      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginTop: '2rem'
        }}
      >

        <form
          onSubmit={submitHandler}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >

          <input

            type="text"

            placeholder="Address"

            value={address}

            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }

            required

            className="form-input"
          />


          <input

            type="text"

            placeholder="City"

            value={city}

            onChange={(e) =>
              setCity(
                e.target.value
              )
            }

            required

            className="form-input"
          />


          <input

            type="text"

            placeholder="Postal Code"

            value={postalCode}

            onChange={(e) =>
              setPostalCode(
                e.target.value
              )
            }

            required

            className="form-input"
          />


          <input

            type="text"

            placeholder="Country"

            value={country}

            onChange={(e) =>
              setCountry(
                e.target.value
              )
            }

            required

            className="form-input"
          />


          {/* PAYMENT METHOD */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >

            <label>
              Payment Method
            </label>

            <select

              value={paymentMethod}

              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }

              className="form-input"
            >

              <option>
                Cash On Delivery
              </option>

              <option>
                Stripe
              </option>

              <option>
                PayPal
              </option>

            </select>

          </div>


          <button

            type="submit"

            className="btn btn-primary"

            style={{
              marginTop: '1rem'
            }}
          >

            Place Order

          </button>

        </form>


        <style>

          {`

          .form-input {

            padding: 0.75rem;

            border-radius: 8px;

            border: 1px solid var(--border-color);

            background: var(--bg-color);

            color: var(--text-primary);

          }

        `}

        </style>

      </div>

    </div>
  );
};

export default Checkout;