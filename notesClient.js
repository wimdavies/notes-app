class NotesClient {
  loadNotes() {
    return fetch('http://localhost:3000/notes')
      .then(response => response.json())
  }
  
  createNote(noteString) {
    return fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'content': noteString })
    })
      .then(response => response.json())
  }
}

// const client = new NotesClient;
// const note = "Post attempt";

// client.createNote(note)
//   .then((data) => {
//   console.log(data)
// });


// console.log(fetch('http://localhost:3000/notes', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ 'content': 'a note' })
//     })
//       .then(response => response.json())
//       .then(data => {
//           console.log(data)
//         }));

module.exports = NotesClient