const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        _id: ID
        email: String
    }

    type Query {
        _dummy: String
    }
`;

module.exports = typeDefs;