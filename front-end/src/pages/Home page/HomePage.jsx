import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./HomePage.css";

export default function HomePage({ history }) {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="welcome-text">
            <div>
              <h1>welcome to Note Zipper</h1>
              <p>store all your notes in on place</p>
            </div>
            <div className="btn-container">
              <a href="/login">
                <Button size="lg" className="homeBtn" variant="info">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="homeBtn" variant="light">
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
