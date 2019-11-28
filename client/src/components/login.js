import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { ApolloProvider, Query, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const USER_QUERY = gql`
    query {
        login {
            email
            password
            roles
        }
    }
`;

const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

function Login() {
    const roles = useQuery(
        USER_QUERY
    );
    console.log(roles);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input value={email} onchange={e => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" required />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input value={password} onchange={e => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="don't tell!" required />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}

export default Login;