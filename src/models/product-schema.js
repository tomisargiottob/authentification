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
    getProducts(field:String, value:String): [Product],
  }
  type Mutation {
    createProduct(data: ProductInput!): Product,
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);

module.exports = schema;
