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
      // clearing the input field once user has clicked
      document.querySelector('#note-input').value = "";
    })
  }

  displayNotes() {
    //first, refresh the list by removing current `div.note`s
    document.querySelectorAll('div.note').forEach(div => {
      div.remove();
    });

    // then, display the list afresh
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