const NotesModel = require('./notesModel');

class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    // adding an on-click event listener to add-note-button
    document.querySelector('#add-note-button').addEventListener('click', () => {
      // assigns the value of note-input to a variable
      const newNote = document.querySelector('#note-input').value;
      // uses addNewNote function to add the note to model and dynamically display all notes
      this.addNewNote(newNote);
    })
  }

  displayNotes() {
    let notes = this.model.getNotes();

    notes.forEach(note => {
      const div = document.createElement('div');

      div.textContent = note;
      div.className = 'note';

      this.mainContainerEl.append(div);
    });
  }

  addNewNote(note) {
    this.model.addNote(note);

    this.displayNotes();
  }
}

module.exports = NotesView;