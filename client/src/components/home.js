import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

const GET_CURRENT_USER = gql`
    {
        user @client {
            id
            email
            role
        }
    }
`;

const HomeContent = () => {    
    const client = useApolloClient()
    console.log({client});
    
    console.log('home');

    const [user, setUser] = useState({})
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        onCompleted(data)  {
            console.log('complete');
            
            if(data) {
                setUser(data.user)
                console.log('user',data.user)
            }
        }
    })
    if(data) { console.log("if data", data);}
    // if(loading) console.log({loading});
    if(error) console.log({error});

    if (user.role === "ADMIN") return <h1>ABC</h1>
    if (user.role === "INSTRUCTOR") return <h1>BC</h1>

    return (
        <ul>
            <li>ID: {user.id}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
        </ul>
    )
}

const Home = () => {

    return (
        <HomeContent />
    );
}

export default Home;