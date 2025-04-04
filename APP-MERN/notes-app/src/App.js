import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/notes').then(res => setNotes(res.data));
    }, []);

    const addNote = () => {
        if (!title || !description) return;
        axios.post('http://localhost:5000/notes', { title, description }).then(res => {
            setNotes([...notes, res.data]);
            setTitle('');
            setDescription('');
        });
    };

    const deleteNote = (id) => {
        axios.delete(`http://localhost:5000/notes/${id}`).then(() => setNotes(notes.filter(note => note.id !== id)));
    };

    return (
        <div className="container">
            <header>Notes App</header>
            <h1>Welcome To Notes.com</h1>
            <div className="note-input">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title Of Note" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Add A Note"></textarea>
                <button onClick={addNote}>Add a Note</button>
            </div>
            <h2>Your Notes :</h2>
            <ul>
                {notes.length === 0 ? <p>Yet You Have Not Created Any Note !</p> : notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;