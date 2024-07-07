import React, { useState, useEffect } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Draggable from "react-draggable";
import "./styles.css";
import Tooltip from "@material-ui/core/Tooltip";

const Note = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);
    const [editedChecklist, setEditedChecklist] = useState([...props.checklist]);

    useEffect(() => {
        reorderChecklist();
    }, [editedChecklist]);

    const deleteNote = () => {
        props.deleteItem(props.id);
    };

    const handleEdit = () => {
        setEditMode(true);
        // Initialize edited checklist with current props
        setEditedChecklist([...props.checklist]);
    };

    const handleSave = () => {
        props.editItem(
            editedTitle,
            editedContent,
            backgroundColor,
            editedChecklist
        );
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
        newChecklist[index].checked = !newChecklist[index].checked;

        // Move checked items to the end and unchecked items to the top
        const item = newChecklist.splice(index, 1)[0];
        if (item.checked) {
            newChecklist.push(item);
        } else {
            newChecklist.unshift(item);
        }

        setEditedChecklist(newChecklist);
    };

    const handleKeyPress = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addChecklistItem(index + 1); // Add new item after the current item
        }
    };

    const addChecklistItem = (index) => {
        const newChecklist = [...editedChecklist];
        newChecklist.splice(index, 0, { text: "", checked: false });
        setEditedChecklist(newChecklist);
    };

    const reorderChecklist = () => {
        const newChecklist = [...editedChecklist];
        // Move checked items to the end and unchecked items to the top
        const checkedItems = newChecklist.filter(item => item.checked);
        const uncheckedItems = newChecklist.filter(item => !item.checked);
        setEditedChecklist([...uncheckedItems, ...checkedItems]);
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
                            {!props.isCheckbox ?
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    style={{ backgroundColor }}
                                />
                                :
                                <div>
                                    {editedChecklist.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
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
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                                placeholder="Add item..."
                                                style={{
                                                    marginLeft: "8px",
                                                    fontWeight: "normal",
                                                    textDecoration: item.checked
                                                        ? "line-through"
                                                        : "none",
                                                    fontSize: "14px"
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>}
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button className="btn save-btn" onClick={handleSave}>
                                    Save
                                </button>
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
                                    <div
                                        key={index}
                                        style={{ display: "flex", alignItems: "center" }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            readOnly
                                            style={{ width: "20px" }}
                                        />
                                        <p
                                            style={{
                                                marginLeft: "8px",
                                                textDecoration: item.checked
                                                    ? "line-through"
                                                    : "none",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button className="btn edit-btn" onClick={handleEdit}>
                                    Edit
                                </button>
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
