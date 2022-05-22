import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MainPage from "../../component/MainPage";
import {
  Badge,
  Button,
  Card,
  Accordion,
  AccordionCollapse,
  AccordionButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotes, deleteNoteAction } from "../../redux/actions/notesAction";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";

export default function MyNotes({ search }) {
  //take notes out from our state
  const dispatch = useDispatch();
  // name to the state
  const noteList = useSelector((state) => state.noteList);
  // console.log(noteList);

  //destructing what we need from state
  const { loading, error, notes } = noteList;
  // console.log(notes);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // getting state to show our note that was created immediately on the screen
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  //  update the note
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  //   delete note
  const noteDelete = useSelector((state) => state.noteDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const history = useHistory();

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  // render the notes that come from the backend
  return (
    <MainPage title={`Welcome Back ${userInfo.name}..`}>
      <Link to="createnote">
        <Button
          className="btn btn-info"
          style={{ marginLeft: 10, marginBottom: 10 }}
          size="lg"
        >
          Create new Note
        </Button>
      </Link>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .reverse()
          .filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
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
                      fontSize: 18,
                    }}
                  >
                    <AccordionButton as={Card.Text} variant="link">
                      {note.title}
                    </AccordionButton>
                  </span>
                  <div>
                    {/* edit button */}
                    <Button href={`/note/${note._id}`}>Edit</Button>

                    {/* delete button */}
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
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
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </AccordionCollapse>
              </Card>
            </Accordion>
          ))}
    </MainPage>
  );
}
