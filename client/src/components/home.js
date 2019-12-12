import React from 'react';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const GET_CURRENT_USER = gql`
    query getUser {
        me {
            id
            email
            role
        }
    } 
`;

const HomeContent = () => {    

    const { loading, error, data } = useQuery(GET_CURRENT_USER)

    if(error) console.error(error);
    
    if(data && data.me) {
        if (data.me.role === "ADMIN") return <h1>ABC</h1>
        if (data.me.role === "INSTRUCTOR") return <h1>BC</h1>
    } else {
        return <Redirect to='/' />
    }
}

const Home = () => {
    return (
        <HomeContent />
    );
}

export default Home;