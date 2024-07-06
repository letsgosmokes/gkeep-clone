import React, { useState } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Draggable from 'react-draggable'; // Import Draggable component
import "./styles.css";

const Note = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [backgroundColor, setBackgroundColor] = useState("#fff"); // Initial background color

    const deleteNote = () => {
        props.deleteItem(props.id);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        props.editItem(props.id, editedTitle, editedContent);
        setEditMode(false);
    };

    const handleColorChange = (color) => {
        setBackgroundColor(color);
    };

    return (
        <Draggable>
            <div>
                <div className="note" style={{ backgroundColor }}>
                    {editMode ? (
                        <div>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                style={{ backgroundColor }}
                            />
                            <button className="btn save-btn" onClick={handleSave}>Save</button>
                            <input
                                className="color-input"
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => handleColorChange(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div>
                            <h1>{props.title}</h1>
                            <p>{props.content}</p>
                            <button className="btn edit-btn" onClick={handleEdit}>Edit</button>
                            <button className="btn" onClick={deleteNote}>
                                <DeleteOutlineIcon className="deleteIcon" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default Note;
