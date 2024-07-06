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

  const editNote = (id, editedTitle, editedContent, backgroundColor) => {
      setAddItem((prevData) =>
          prevData.map((note, index) => {
              if (index === id) {
                  return { ...note, title: editedTitle, content: editedContent, backgroundColor };
              }
              return note;
          })
      );
  };

  return (
      <>
          <Header />
          <CreateNote passNote={addNote} />
          {addItem.map((note, index) => (
              <Note
                  key={index}
                  id={index}
                  title={note.title}
                  content={note.content}
                  backgroundColor={note.backgroundColor}
                  isCheckbox={note.isCheckbox}
                  checklist={note.checklist}
                  deleteItem={deleteNote}
                  editItem={editNote}
              />
          ))}
      </>
  );
};

export default Main;