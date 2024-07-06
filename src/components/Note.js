import React, { useState } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import "./styles.css";

const Note = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);

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

    return (
        <div className="note">
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
                    />
                    <button className="btn save-btn" onClick={handleSave}>Save</button>
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
    );
};

export default Note;
