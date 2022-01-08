function returnProducts(rawProducts) {
  if (Array.isArray(rawProducts)) {
    const products = rawProducts.map((product) => ({
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
    return products;
  }
  return ({
    name: rawProducts.name,
    price: rawProducts.price,
    thumbnail: rawProducts.thumbnail,
  });
}

module.exports = returnProducts;
