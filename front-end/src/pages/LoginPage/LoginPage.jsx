import React, { useState } from 'react';
import MainPage from '../../component/MainPage';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../component/Loading';
import './LoginPage.css';
import ErrorMessage from '../../component/ErrorMessage';


export default function LoginPage() {

    // store email,password in state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const userData = { email, password }
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            };
            setLoading(true)

            //fetch data from backend,user enter email and password, send to the server to find match.  
            const dataFromUserLogin = await fetch('http://localhost:5000/api/users/login', options)
            const returnDataFromServer = await dataFromUserLogin.json()
            // .then(res => { return res.json() })
            // .then(result => { console.log(result) }

            console.log(returnDataFromServer);
            //store email and password in local storage. convert it to string because local storage cannot store object
            localStorage.setItem('userInfo', JSON.stringify(returnDataFromServer))
            setLoading(false);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <MainPage title='LOGIN'>
            <div className="login-container">
                {error && <ErrorMessage variant="info">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form className="mx-auto" onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}

                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
            </div>

        </MainPage >
    )
}
