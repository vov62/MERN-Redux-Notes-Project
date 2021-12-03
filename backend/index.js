
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const notes = require("./data/notes");



const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server is running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("Hello from backend")
});

app.get("/api/notes", (req, res) => {
    res.json(notes)
})
app.get("/api/notes/:id", (req, res) => {
    //  הפונקציה תחפש בקובץ נוטס ואם היא תמצא נוט עם אותו איידי שהוקלד היא תחזיר אותו   
    const singleNote = notes.find((note) => note._id === req.params.id)
    res.send(singleNote)
})