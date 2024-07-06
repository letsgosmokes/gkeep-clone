import React, { useState } from "react";
import Header from "./Header";
import CreateNote from "./CreateNote";
import Note from "./Note";
import "./styles.css";

const Main = () => {
    const [addItem, setAddItem] = useState([]);

    const addNote = (note) => {
        setAddItem((prevData) => [...prevData, note]);
    };

    const deleteNote = (id) => {
        setAddItem((prevData) =>
            prevData.filter((note, index) => index !== id)
        );
    };

    const editNote = (id, editedTitle, editedContent) => {
        setAddItem((prevData) =>
            prevData.map((note, index) => {
                if (index === id) {
                    return { ...note, title: editedTitle, content: editedContent };
                }
                return note;
            })
        );
    };

    return (
        <>
            <Header />
            <CreateNote passNote={addNote} />
            {addItem.map((val, index) => (
                <Note
                    key={index}
                    id={index}
                    title={val.title}
                    content={val.content}
                    deleteItem={deleteNote}
                    editItem={editNote}
                />
            ))}
        </>
    );
};

export default Main;
