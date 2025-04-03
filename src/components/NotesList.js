import React from "react";

const NotesList = ({ notes, deleteNote }) => {
    return (
        <div className="row">
            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <div className="card mx-2 my-2" style={{ width: "18rem" }} key={index}>
                        <div className="card-body">
                            <p align="right" style={{ color: "brown" }}>{note.date}</p>
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.text}</p>
                            <button className="btn btn-info" onClick={() => deleteNote(index)}>
                                Delete Note
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h5>Yet You Have Not Created Any <b>Note</b> !</h5>
            )}
        </div>
    );
};

export default NotesList;
