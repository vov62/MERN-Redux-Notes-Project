const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');


const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes)
});

const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please fill all the fields');
        return;
    }
    else {
        // creating new note from notes model and storing the title,content,category to DB 
        const note = new Note({ user: req.user._id, title, content, category })
        //save note to DB
        const createdNote = await note.save();
        //success status
        res.status(201).json(createdNote)
    }
});

const getNoteById = asyncHandler(async (req, res) => {

    // fetching the id of note from the url and finding by the id 
    const note = await Note.findById(req.params.id);
    // when the id is found send it 
    if (note) {
        res.json(note);
    } else {
        //if not found ...
        res.status(404).json({ message: "Note not found" })
    }
    res.json(note);
});

const updateNote = asyncHandler(async (req, res) => {

    // getting from the user to be updated
    const { title, content, category } = req.body;

    //finding the note by fetching the id of note from the url 
    const note = await Note.findById(req.params.id);

    // check if the note is belong to the user who is requesting to update this note
    //<----- error on postman,check later--->

    if (note.user.toString() !== req.user._id.toString()) {
        //if not equal throw error
        res.status(401);
        throw new Error('Not allowed to perform this action');
    }

    // compare the note we getting to the note we getting from the req.body(from the user) 
    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        //save to DB updated Note;
        const updatedNote = await note.save();
        //success message to the user
        res.json(updatedNote)
    } else {
        //if note not found...
        res.status(404);
        throw new Error('Note not found');
    }



});

const deleteNote = asyncHandler(async (req, res) => {

    //finding the note by fetching the id of note from the url 
    const note = await Note.findById(req.params.id);

    // check if the note is belong to the user who is requesting to update this note
    if (note.user.toString() !== req.user._id.toString()) {
        //if not equal throw error
        res.status(401);
        throw new Error('Not allowed to perform this action');
    }

    // if note exist we sent request to delete this note 
    if (note) {
        await note.remove();
        res.json({ message: "Note successfully Removed" });
    } else {
        res.status(404);
        throw new Error("Note not found")
    }

})

module.exports = { getAllNotes, createNote, getNoteById, updateNote, deleteNote }
