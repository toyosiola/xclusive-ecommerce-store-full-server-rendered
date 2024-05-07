function formatPrice(price, discount = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price - price * discount) / 100);
}

export default formatPrice;
