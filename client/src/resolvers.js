import gql from 'graphql-tag';
 
export const typeDefs = gql`
    extend type query {
        isLoggedIn: Boolean!,
        User: User
    }
`

export const resolvers = {}

