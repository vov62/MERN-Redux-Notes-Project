import React from 'react'
import { Container, Row } from 'react-bootstrap';
import './MainPage.css';

export default function MainPage({ title, children }) {
    return (
        <div className="mainPage">
            <Container>
                <Row>
                    <div className="page">
                        {title && (
                            <>
                                <h1 className="heading">{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>

        </div>
    )
}
