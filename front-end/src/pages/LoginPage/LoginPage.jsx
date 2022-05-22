import React, { useState, useEffect } from "react";
import MainPage from "../../component/MainPage";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  // store email,password in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  // using dispatch to call userLogin action
  const dispatch = useDispatch();
  // access to the state
  // name of the reducer 'userLogin'
  const userLogin = useSelector((state) => state.userLogin);
  // destructure out the variables from this state
  const { loading, error, userInfo } = userLogin;

  // if the user already logged in => route to 'mynotes' page .
  useEffect(() => {
    // check if there something inside userInfo
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // call the action ,sending email,password to the action
    dispatch(login(email, password));
  };

  return (
    <MainPage title="LOGIN">
      <div className="login-container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form className="mx-auto" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
    </MainPage>
  );
}
