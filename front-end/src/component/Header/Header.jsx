import React, { useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { useHistory } from "react-router-dom";

export default function Header({ setSearch }) {
  const history = useHistory();

  // using dispatch to call userLogin action
  const dispatch = useDispatch();

  // access to the state
  // name of the reducer 'userLogin'
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // after user logout => move to homepage
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <div>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        style={{ textDecoration: "none" }}
      >
        <Container style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              Note Zipper
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>

            {userInfo ? (
              <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/mynotes" style={{ textDecoration: "none" }}>
                  My Notes
                </Link>

                <NavDropdown
                  title={`${userInfo && userInfo.name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
