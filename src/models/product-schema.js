const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Product {
    id: ID!
    price: Float,
    name: String,
    thumbnail: String
  }
  input ProductInput {
    price: Float,
    name: String,
    thumbnail: String
  }
  type Query {
    getProduct(id: ID): Product,
    getProducts(campo:String, valor:String): [Product],
  }
  type Mutation {
    createProduct(datos: ProductInput!): Product,
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);

module.exports = schema;
