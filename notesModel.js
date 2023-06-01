class NotesModel {
  constructor() {
    this.notes = [];
  };

  getNotes() {
    return this.notes;
  };

  setNotes(notesArray) {
    this.notes = notesArray
  }

  addNote(note) {
    this.notes.push(note);
  }

  reset() {
    this.notes = [];
  }
}

module.exports = NotesModel