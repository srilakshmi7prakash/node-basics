import React, { useState, useEffect } from "react";


const apiBaseUrl = process.env.REACT_APP_API_URL;

export default function Note() {

    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState('');
    const [message, setMessage] = useState('');

    const fetchNotes = async () => {
        const allNotes = await fetch(`${apiBaseUrl}/read`);
        const results = await allNotes.text();
        setAllNotes(results);
    }

    useEffect(() => {
        fetchNotes();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const writeResponse = await fetch(`${apiBaseUrl}/write`, {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note })
            });

            const result = await writeResponse.text();
            setMessage(result);
            setNote('');
            fetchNotes();
        }
        catch (err) {
            setMessage("Error Saving Note");
        }

    }



    return (
        <div className="form-wrapper">

            <h2 className="note-title">Save your Notes</h2>
            <form className="note-form" onSubmit={handleSubmit}>
                <textarea className="note-area" name="note" type="textarea" onChange={e => setNote(e.target.value)} value={note} placeholder="Save your notes here"></textarea>
                <button className="save-bt" >Save</button>
                <div className="message">{message}</div>
                <h3 className="all-title">All Notes:</h3>
                <div className="all-notes">{allNotes}</div>
            </form>
        </div>
    )

}