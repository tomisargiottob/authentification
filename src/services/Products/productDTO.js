function returnProducts(rawProducts) {
  if (Array.isArray(rawProducts)) {
    const products = rawProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
    return products;
  }
  return ({
    id: rawProducts.id,
    name: rawProducts.name,
    price: rawProducts.price,
    thumbnail: rawProducts.thumbnail,
  });
}

module.exports = returnProducts;
