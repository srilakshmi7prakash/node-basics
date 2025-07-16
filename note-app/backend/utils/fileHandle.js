const fs = require('fs');
const path = require('path');


const file_path = path.join(__dirname, 'note.txt');


const readNote = () => {

    const fetchNotes= fs.readFileSync(file_path, 'utf-8');
    return fetchNotes;
}


const writeNote = (notes) => {
    fs.appendFileSync(file_path, notes, '\n');
}


module.exports = { readNote, writeNote }