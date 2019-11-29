import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            email
            password
            role
            token
        }
    }
`;

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, {data, error, loading}] = useMutation(LOGIN_MUTATION);

    if (error) {
        alert('Error Logging In User');
    }

    if (data) {
        alert('Successfully Logged In');
    }

    return(
        <Form onSubmit={e => {
            e.preventDefault();
            loginUser({ variables: { email, password } });
        }}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input value={email} onchange={e => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" required />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input value={password} onchange={e => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="password" required />
            </FormGroup>
            <Button>Login</Button>
        </Form>
    );
}

export default Login;