import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainPage from '../../component/MainPage';
import { Badge, Button, Card, Accordion, AccordionCollapse, AccordionButton } from 'react-bootstrap';

export default function MyNotes() {

    const [notes, setNotes] = useState([]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {

        }

    }
    // connecting dummny data from backend to frontend just for the start to show some data
    //as soon as the page render we are calling our api
    const fetchNotesFromBackend = async () => {
        try {
            const data = await fetch('http://localhost:5000/api/notes/')
                .then(res => { return res.json() })
                .then(result => { return result })
            setNotes(data)
        }
        catch (err) {
            console.error(err);
        }
    }
    // console.log(notes);

    useEffect(() => {
        fetchNotesFromBackend()
    }, [])


    // render the notes that come from the backend 
    return (
        <MainPage title="welcome back avi vovgen...">
            <Link to='createNewNot'>
                <Button className="btn btn-info" style={{ marginLeft: 10, marginBottom: 10 }} size="lg" >
                    Create new Note
                </Button>
            </Link>

            {notes.map((note) => (
                <Accordion key={note._id}>
                    <Card style={{ margin: 10 }}>
                        <Card.Header style={{ display: "flex" }}>
                            <span
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                    flex: 1,
                                    cursor: "pointer",
                                    alignSelf: "center",
                                    fontSize: 18
                                }}>
                                <AccordionButton as={Card.Text} variant="link" >
                                    {note.title}
                                </AccordionButton>
                            </span>
                            <div>
                                <Button href={`/note/${note._id}`}>Edit</Button>
                                <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                            </div>
                        </Card.Header>

                        <AccordionCollapse eventKey="">
                            <Card.Body>
                                <h4>
                                    <Badge className="btn btn-success">
                                        category-{note.category}
                                    </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Created on-date
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </AccordionCollapse>
                    </Card>

                </Accordion>
            ))
            }
        </MainPage >
    )
}
