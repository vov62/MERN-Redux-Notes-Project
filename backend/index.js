// general import
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const notes = require('./data/notes');
const cors = require('cors');
const bodyParser = require('body-parser');

//import db connection
const dbConnection = require('./DB');
dbConnection.on("error", () => {
    console.log('connection error');
});
// import of routes
const usersRouter = require('./routes/usersRoutes');
// import of error handlers
const { notFound, errorHandler } = require('./middleware/errorMIddle');

// accept json data from the user
app.use(express.json())

//use of cors so our server will be able to get requests
app.use(cors());

// configuration of the port based on the env
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("Hello from backend")
});

app.get("/api/notes", (req, res) => {
    res.json(notes)
})
// app.get("/api/notes/:id", (req, res) => {
//     //  הפונקציה תחפש בקובץ נוטס ואם היא תמצא נוט עם אותו איידי שהוקלד היא תחזיר אותו   
//     const singleNote = notes.find((note) => note._id === req.params.id)
//     res.send(singleNote)
// })
app.use('/api/users', usersRouter);

// errors handler use
app.use(notFound)
app.use(errorHandler)
//use of body-parser in order to reach req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))