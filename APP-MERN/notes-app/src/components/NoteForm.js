import React, { useState } from "react";

const NoteForm = ({ addNote }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(title, text);
        setTitle("");
        setText("");
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Title Of Note</h5>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <h5 className="card-title">Add A Note</h5>
                <textarea
                    className="form-control"
                    rows="3"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <br />
                <button className="btn btn-info" onClick={handleSubmit}>
                    Add a Note
                </button>
            </div>
        </div>
    );
};

export default NoteForm;
