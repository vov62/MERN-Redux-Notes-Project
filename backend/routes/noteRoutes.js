const noteRouter = require('express').Router();
const noteCtrl = require('../controllers/notesCtrl');
const { protect } = require('../middleware/authMiddle');

// GET ALL NOTES
noteRouter.get('/', protect, noteCtrl.getAllNotes);
// CREATE NOTE
noteRouter.post('/create', protect, noteCtrl.createNote);
// CREATE SINGLE NOTE
noteRouter.get('/:id', noteCtrl.getNoteById);
noteRouter.put('/:id', protect, noteCtrl.updateNote)
noteRouter.delete('/:id', protect, noteCtrl.deleteNote)

module.exports = noteRouter;
