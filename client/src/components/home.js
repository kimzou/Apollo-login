import React from 'react';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

const HomeContent = () => {
    const token = Cookies.get('token')
    const decode = jwt_decode(token);
    if (decode.role === "ADMIN") return <h1>ABC</h1>
    if (decode.role === "INSTRUCTOR") return <h1>BC</h1>
}

const Home = () => {

    return (
        <HomeContent />
    );
}

export default Home;