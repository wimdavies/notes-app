const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesClient', () => {

  // this test uses `done` as the argument, and so needs `done` at the end
  it('#loadNotes calls fetch and loads notes', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify(
      ['This note is coming from the server', 'Another note']
    ));

    // 3. We call the method. We chain `.then` to handle expectations.
    client.loadNotes()
      .then((returnedDataFromApi) => {
      expect(returnedDataFromApi).toEqual([
        'This note is coming from the server',
        'Another note'
      ]);
      done();
    });
  });

  // this test returns a promise, and so does not require `done` 
  it('#createNote posts a new note to the server', () => {
    // Instantiating the class
    const client = new NotesClient();

    // Mocking the response from `fetch`
    fetchMock.mockResponseOnce(JSON.stringify(
      ['This note is coming from the server', 'Another note', 'A posted note']
    ));
    
    // Saving the request url and options as variables to be expected
    const expectedUrl = 'http://localhost:3000/notes';
    const expectedOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'content': "A posted note" })
    };
    
    // making a note to be passed into the createNotes call
    const note = "A posted note";

    // Calling the method We chain `.then` to handle expectations.
    return client.createNote(note)
      .then((returnedDataFromApi) => {
        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
        expect(returnedDataFromApi).toEqual([
          'This note is coming from the server',
          'Another note',
          'A posted note'
        ]);

      // Telling Jest our test can now end.
      // done();
    });
  });
});