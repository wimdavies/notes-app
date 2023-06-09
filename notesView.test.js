/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');
const NotesView = require('./notesView');

jest.mock('./notesClient');

describe('NotesView', () => {

  // We can use the beforeEach() hook 
  // to set the jest `document` HTML before each test
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    NotesClient.mockClear();
  });

  it('displays a list of notes on the page', () => {
    // 1. Arrange - instantiate our View class
    const model = new NotesModel();
    const view = new NotesView(model);
    // -- setting up the model notes
    model.addNote('Buy milk')
    model.addNote('Walk the dog')

    // 2. Act - call any method that modifies the page
    view.displayNotes();

    // 3. Assert - we assert the page contains what it should.
    // Usually, you will use `.querySelector` (and friends)
    // here, and assert the text content, the number of elements,
    // or other things that make sense for your test.
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('takes user-input note and displays it on button click', () => {
    // 1. Arrange:
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#note-input');
    input.value = 'A test note';

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toBe("A test note");
  });

  it('clears the old list of notes before displaying new list', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#note-input');
    input.value = 'A test note';
    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    const anotherInput = document.querySelector('#note-input');
    anotherInput.value = 'Another test note';
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
    expect(document.querySelectorAll('div.note')[1].textContent).toBe("Another test note");
  });

  it('#displayNotesFromApi receives notes from the client and displays that list', () => {
    const mockClient = new NotesClient();
    
    mockClient.loadNotes.mockResolvedValue(
      ['test note', 'another test note']
    );
    
    const model = new NotesModel();
    const view = new NotesView(model, mockClient);

    return view.displayNotesFromApi()
      .then(() => {
        expect(mockClient.loadNotes).toHaveBeenCalledTimes(1);
        expect(document.querySelectorAll('div.note').length).toEqual(2);
        expect(document.querySelectorAll('div.note')[0].textContent).toBe("test note");
        expect(document.querySelectorAll('div.note')[1].textContent).toBe("another test note");
        // done();
    });
  });

  it('sends user-input note to the server, and displays the new note from that location', async () => {
    const mockClient = new NotesClient();

    const mockData = ['test note', 'another test note', 'buy milk'];
    const mockNote = 'buy milk';

    mockClient.createNote.mockResolvedValue(mockData);

    const model = new NotesModel();
    const view = new NotesView(model, mockClient);

    const input = document.querySelector('#note-input');
    input.value = mockNote;

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    await Promise.resolve();

    expect(mockClient.createNote).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll('.note').length).toEqual(3);
    expect(document.querySelectorAll('.note')[-1].textContent).toBe('buy milk');
  });
});