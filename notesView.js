const NotesModel = require('./notesModel');

class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
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
}

module.exports = NotesView;