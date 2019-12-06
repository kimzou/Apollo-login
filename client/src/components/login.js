import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Cookies from 'js-cookie';

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            error
            user {
                id
                email
                role
            }
        }
    }
`;

function Login(props) {
    const client = useApolloClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
        onError(error) {
            console.log('Error : ', error)
        },
        onCompleted(data) {            
            if (data.login.token) {
                Cookies.set('token', data.login.token, { expires: data.login.tokenExpiration })
                client.writeData({ data: { isLoggedIn: true }})
                // console.log('user', data.login.user);
                
                // client.writeQuery({ 
                //     query: LOGIN_MUTATION, 
                //     data: { 
                //         // login: { 
                //             user: { 
                //                 __typename: "CurrentUser", 
                //                 id: data.login.user.id, 
                //                 email: data.login.user.email 
                //             }
                //         // } 
                //     }
                // })

                // client.writeQuery({query: LOGIN_MUTATION, data: data})
                client.writeData({ data: { user: data.login.user } })
                // client.writeData({ query: LOGIN_MUTATION }, { data: {user: data.login.user }})
                // console.log({client});
                
                props.history.push('/')
            } else if (data.login.error) {
                alert(data.login.error)
            } else if(data.login.user) console.log('user', data.login.user);
            
        }
    });

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            loginUser({
                variables: { email, password }
            });
        }}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" required />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="password" required />
            </FormGroup>
            <Button disabled={loading}>Login</Button>
        </Form>
    );
}

export default Login;