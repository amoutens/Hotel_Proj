const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Client {
    _id: ID!
    name: String
    phone: String
    passport: String
  }

  input ClientInput {
    name: String!
    phone: String!
    passport: String!
  }

  type Query {
    getClient(id: ID!): Client
    getClients: [Client]
  }

  type Mutation {
    createClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): Client
  }
`);

module.exports = schema;
