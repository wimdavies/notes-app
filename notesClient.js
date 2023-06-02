class NotesClient {
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data);
    });
  }

  createNote(noteString, callback) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'content': noteString })
    })
      .then(response => response.json())
      .then(data => {
        callback(data);
    });
  }
}

// const client = new NotesClient;
// const note = "Post attempt";

// client.createNote(note, (data) => {
//   console.log(data)
// });

module.exports = NotesClient