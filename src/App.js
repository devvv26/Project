import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

const App = () => {
    const [notes, setNotes] = useState([]);

    // Load notes from localStorage
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    // Save notes to localStorage
    const saveNotes = (updatedNotes) => {
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    // Add a new note
    const addNote = (title, text) => {
        if (!title || !text) return;
        const newNote = { title, text, date: new Date().toLocaleDateString() };
        saveNotes([...notes, newNote]);
    };

    // Delete a note
    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        saveNotes(updatedNotes);
    };

    return (
        <div className="container my-3">
            <h1>Welcome To Notes.com</h1>
            <NoteForm addNote={addNote} />
            <h2>Your Notes:</h2>
            <NotesList notes={notes} deleteNote={deleteNote} />
        </div>
    );
};

export default App;
