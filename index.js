const NotesClient = require('./notesClient');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

// 1. Setup the client
const client = new NotesClient();
// 2. Setup the model with two notes
const model = new NotesModel;
// 3. Setup the view
const view = new NotesView(model, client);
// 4. Make the view display notes
view.displayNotesFromApi();