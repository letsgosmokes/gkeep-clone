import React, { useState } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Draggable from 'react-draggable';
import "./styles.css";
import Tooltip from '@material-ui/core/Tooltip';

const Note = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);
    const [editedChecklist, setEditedChecklist] = useState([...props.checklist]);

    const deleteNote = () => {
        props.deleteItem(props.id);
    };

    const handleEdit = () => {
        setEditMode(true);
        // Initialize edited checklist with current props
        setEditedChecklist([...props.checklist]);
    };

    const handleSave = () => {
        props.editItem(props.id, editedTitle, editedContent, backgroundColor, editedChecklist);
        setEditMode(false);
    };

    const handleColorChange = (color) => {
        setBackgroundColor(color);
    };

    const handleChecklistChange = (index, event) => {
        const newChecklist = [...editedChecklist];
        newChecklist[index].text = event.target.value;
        setEditedChecklist(newChecklist);
    };

    const handleCheckboxChange = (index) => {
        const newChecklist = [...editedChecklist];
        // Toggle the checked state
        newChecklist[index].checked = !newChecklist[index].checked;
        
        // If checked, move the item to the end of the array
        if (newChecklist[index].checked) {
            const checkedItem = newChecklist.splice(index, 1)[0];
            newChecklist.push(checkedItem);
        }
    
        setEditedChecklist(newChecklist);
    };
    

    const moveCheckedToEnd = () => {
        const uncheckedItems = editedChecklist.filter(item => !item.checked);
        const checkedItems = editedChecklist.filter(item => item.checked);
        const reorderedChecklist = [...uncheckedItems, ...checkedItems];
        setEditedChecklist(reorderedChecklist);
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
                            <div>
                                {editedChecklist.map((item, index) => (
                                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => handleCheckboxChange(index)}
                                            style={{ width: "25px" }}
                                        />
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => handleChecklistChange(index, e)}
                                            onBlur={moveCheckedToEnd}
                                            placeholder={`Item ${index + 1}`}
                                            style={{
                                                marginLeft: "8px",
                                                fontWeight: "normal",
                                                textDecoration: item.checked ? "line-through" : "none"
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button className="btn save-btn" onClick={handleSave}>Save</button>
                                <Tooltip title="Pick a background color" arrow>
                                    <input
                                        className="color-input"
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => handleColorChange(e.target.value)}
                                        style={{ width: "25px" }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>{props.title}</h1>
                            <p>{props.content}</p>
                            <div>
                                {props.checklist.map((item, index) => (
                                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            readOnly
                                            style={{ width: "20px" }}
                                        />
                                        <p style={{
                                            marginLeft: "8px",
                                            textDecoration: item.checked ? "line-through" : "none",
                                            fontWeight: "normal"
                                        }}>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button className="btn edit-btn" onClick={handleEdit}>Edit</button>
                                <button className="btn delete-btn" onClick={deleteNote}>
                                    <DeleteOutlineIcon />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default Note;
