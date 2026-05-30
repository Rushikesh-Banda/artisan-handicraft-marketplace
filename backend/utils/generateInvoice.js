const generateInvoice = (order) => {

  return `
  <html>

    <head>
      <style>

        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }

        .invoice-container {
          max-width: 900px;
          margin: auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 10px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h1 {
          margin: 0;
          color: #333;
        }

        .section {
          margin-bottom: 25px;
        }

        .section h3 {
          margin-bottom: 10px;
          color: #444;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        table th,
        table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        table th {
          background-color: #f0f0f0;
        }

        .totals {
          margin-top: 20px;
          width: 300px;
          margin-left: auto;
        }

        .totals td {
          padding: 10px;
        }

        .grand-total {
          font-weight: bold;
          font-size: 18px;
        }

      </style>
    </head>

    <body>

      <div class="invoice-container">

        <!-- Header -->
        <div class="header">
          <h1>Artisan Marketplace</h1>
          <p>Order Invoice</p>
        </div>


        <!-- Order Info -->
        <div class="section">
          <h3>Order Details</h3>

          <p>
            <strong>Order ID:</strong>
            ${order._id}
          </p>

          <p>
            <strong>Order Date:</strong>
            ${new Date(order.createdAt)
              .toLocaleDateString()}
          </p>

          <p>
            <strong>Payment Method:</strong>
            ${order.paymentMethod}
          </p>

          <p>
            <strong>Status:</strong>
            ${order.status}
          </p>
        </div>


        <!-- Customer Info -->
        <div class="section">
          <h3>Shipping Address</h3>

          <p>
            ${order.shippingAddress.address},
            ${order.shippingAddress.city},
            ${order.shippingAddress.postalCode},
            ${order.shippingAddress.country}
          </p>
        </div>


        <!-- Order Items -->
        <div class="section">
          <h3>Ordered Items</h3>

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              ${order.orderItems.map(item => `

                <tr>
                  <td>${item.name}</td>

                  <td>${item.qty}</td>

                  <td>$${item.price}</td>

                  <td>
                    $${item.qty * item.price}
                  </td>
                </tr>

              `).join("")}

            </tbody>

          </table>
        </div>


        <!-- Totals -->
        <table class="totals">

          <tr>
            <td>Items Price</td>
            <td>$${order.itemsPrice}</td>
          </tr>

          <tr>
            <td>Tax</td>
            <td>$${order.taxPrice}</td>
          </tr>

          <tr>
            <td>Shipping</td>
            <td>$${order.shippingPrice}</td>
          </tr>

          <tr class="grand-total">
            <td>Total</td>
            <td>$${order.totalPrice}</td>
          </tr>

        </table>

      </div>

    </body>

  </html>
  `;
};


module.exports = generateInvoice;