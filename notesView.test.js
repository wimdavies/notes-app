/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

describe('NotesView', () => {

  // We can use the beforeEach() hook 
  // to set the jest `document` HTML before each test
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
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

    // 2. Act:
    const input = document.querySelector('#note-input');
    input.value = 'A test note';

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toBe("A test note");
  });
});