const TAX_RATE = 0.15;

const FREE_SHIPPING_THRESHOLD = 100;

const SHIPPING_FEE = 10;


// Format Decimal Utility
const addDecimals = (num) => {

  return Number(
    (Math.round(num * 100) / 100)
      .toFixed(2)
  );
};


// Calculate Order Prices
const calculatePrices = (
  orderItems,
  discount = 0
) => {

  // Items Price
  const itemsPrice = addDecimals(

    orderItems.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    )
  );


  // Shipping Price
  const shippingPrice = addDecimals(

    itemsPrice >=
    FREE_SHIPPING_THRESHOLD

      ? 0

      : SHIPPING_FEE
  );


  // Tax Price
  const taxPrice = addDecimals(
    itemsPrice * TAX_RATE
  );


  // Discount Price
  const discountPrice = addDecimals(
    discount
  );


  // Final Total Price
  const totalPrice = addDecimals(

    itemsPrice +
    shippingPrice +
    taxPrice -
    discountPrice
  );


  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    discountPrice,
    totalPrice,
  };
};


module.exports = calculatePrices;