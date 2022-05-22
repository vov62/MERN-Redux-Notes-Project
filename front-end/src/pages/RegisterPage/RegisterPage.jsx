import React, { useState, useEffect } from 'react';
import MainPage from '../../component/MainPage';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import ErrorMessage from '../../component/ErrorMessage';
import Loading from '../../component/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userAction';


export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //error state message
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    // using dispatch to call userRegistration action
    const dispatch = useDispatch();

    // access to the state 
    // name of the reducer 'userRegistration'
    const userRegistration = useSelector(state => state.userRegistration);
    // destructure out the variables from this state
    const { loading, error, userInfo } = userRegistration;

    const history = useHistory();

    useEffect(() => {
        if (userInfo) {
            history.push('/mynotes')
        }
    }, [history, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        // check if password match
        if (password !== confirmPassword) {
            setMessage("Password Do Not Match");
            // if password match,call the action ,send the params to the action
        } else {
            dispatch(register(name, email, password, picture))
        }
    };

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
