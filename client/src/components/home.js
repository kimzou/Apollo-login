import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'

const Home = () => {

    const token = localStorage.getItem('token')
    console.log(jwt_decode(token));
    
    
    return (
        "lol"
    );
}

export default Home;