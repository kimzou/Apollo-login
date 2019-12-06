import gql from 'graphql-tag';

// import { GET_CURRENT_USER } from './components/home'
 
export const typeDefs = gql`
    extend type query {
        isLoggedIn: Boolean!,
        User: User
    }
`

export const resolvers = {
    // Query: {
    //     me: (_, __, { cache }) => {
    //         const { user } = cache.readQuery({ query: LOGIN_MUTATION });
    //         cache.writeQuery({ query: GET_CURRENT_USER, user });
    //         return user;
    //     }
    // }
}

