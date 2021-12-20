import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }}>
            <Spinner style={{
                width: "50px",
                height: "50px"
            }}
                animation="border" variant="light">
            </Spinner>

        </div>
    )
}
