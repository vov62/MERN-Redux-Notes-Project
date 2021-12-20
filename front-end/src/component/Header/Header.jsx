import React from 'react';
import { Navbar, Container, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const history = useHistory();

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" style={{ textDecoration: 'none' }}>
                <Container style={{ textDecoration: 'none' }}>
                    <Navbar.Brand>
                        <Link to='/' style={{ textDecoration: 'none' }}>Note Zipper</Link>
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
                                />
                            </Form>
                        </Nav>
                        <Nav
                            className="my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to='/mynotes' style={{ textDecoration: 'none' }}>My Notes</Link>
                            <NavDropdown title="avi vovgen" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    //account log out and back to home page
                                    localStorage.removeItem("userInfo");
                                    history.push('/');
                                }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}
