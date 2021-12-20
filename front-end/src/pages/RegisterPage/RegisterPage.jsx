import React, { useState } from 'react';
import MainPage from '../../component/MainPage';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';
import ErrorMessage from '../../component/ErrorMessage';
import Loading from '../../component/Loading';

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //error state message
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords Dont Match !');
        } else {
            setMessage(null);

            // creating user register and save to db .
            try {
                const userData = { name, email, password, picture }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                };
                setLoading(true);

                //user enter name,email,password and picture, send to the server.  
                const postUserData = await fetch('http://localhost:5000/api/users', options);
                const dataSaveToDb = await postUserData.json();

                console.log(dataSaveToDb);
                setLoading(false);

                //store the data in local storage. convert it to string because local storage cannot store object
                localStorage.setItem('userInfo', JSON.stringify(dataSaveToDb));

            } catch (err) {
                setError(err.response.data.message);
            }
        }
    }

    //picture upload
    const postPictureDetails = (pic) => {
        if (pic === undefined) {
            return setPicMessage("Please select an image")
        }
        setPicMessage(null);

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'NoteZipperProject');
            data.append('cloud_name', 'diqalh5f8');
            fetch('https://api.cloudinary.com/v1_1/diqalh5f8/image/upload', {
                method: 'POST',
                body: data,
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPicture(data.url.toString())
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            return setPicMessage("Please select an image");
        }
    }

    return (
        <MainPage title="REGISTER">
            <div className="login-container">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage >}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage >}
                {loading && <Loading />}
                <Form onSubmit={submitHandler} className="mx-auto">
                    <Form.Group className="mb-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} required />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                            required />
                    </Form.Group>

                    {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage >)}
                    <Form.Group controlId="picture" className="mb-2">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={(e) => postPictureDetails(e.target.files[0])} />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Already Register?<Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div >


        </MainPage >
    )
}
