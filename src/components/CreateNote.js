import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import "./styles.css";

const CreateNote = (props) => {
    const [expand, setExpand] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: "",
        backgroundColor: "#fff",
        isCheckbox: false,
        checklist: []
    });

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setNote((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addEvent = () => {
        props.passNote({
            ...note, // Pass all properties of 'note'
        });
        setNote({
            title: "",
            content: "",
            backgroundColor: "#fff",
            isCheckbox: false,
            checklist: []
        });
    };

    const expandIt = () => {
        setExpand(true);
    };

    const bToNormal = () => {
        setExpand(false);
    };

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setNote((prevData) => ({
            ...prevData,
            backgroundColor: newColor,
        }));
    };

    const toggleInputType = () => {
        setNote((prevData) => ({
            ...prevData,
            isCheckbox: !prevData.isCheckbox,
            checklist: prevData.isCheckbox ? [] : [{ text: "", checked: false }]
        }));
    };

    const handleChecklistChange = (index, event) => {
        const newChecklist = [...note.checklist];
        newChecklist[index].text = event.target.value;
        setNote((prevData) => ({
            ...prevData,
            checklist: newChecklist
        }));
    };

    const handleCheckboxChange = (index) => {
        const newChecklist = [...note.checklist];
        // Toggle the checked state
        newChecklist[index].checked = !newChecklist[index].checked;
        
        // If checked, move the item to the end of the array
        if (newChecklist[index].checked) {
            const checkedItem = newChecklist.splice(index, 1)[0];
            newChecklist.push(checkedItem);
        }
    
        setNote((prevData) => ({
            ...prevData,
            checklist: newChecklist
        }));
    };
    

    const addChecklistItem = () => {
        setNote((prevData) => ({
            ...prevData,
            checklist: [...prevData.checklist, { text: "", checked: false }]
        }));
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addChecklistItem();
        }
    };

    return (
        <div className='main_note' onDoubleClick={bToNormal}>
            <form style={{ backgroundColor: note.backgroundColor }}>
                {expand &&
                    <input
                        type='text'
                        name="title"
                        value={note.title}
                        onChange={InputEvent}
                        placeholder='Title'
                        autoComplete='off'
                    />
                }
                {note.isCheckbox ? (
                    <div>
                        {note.checklist.map((item, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                    style={{ width: "20px" }}
                                />
                                <input
                                    type="text"
                                    value={item.text}
                                    onChange={(e) => handleChecklistChange(index, e)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={`Item ${index + 1}`}
                                    style={{
                                        textDecoration: item.checked ? "line-through" : "none",
                                        marginLeft: "8px",
                                        flex: 1,
                                        fontWeight: "normal"
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <textarea
                        rows=""
                        column=""
                        name="content"
                        value={note.content}
                        onChange={InputEvent}
                        placeholder="Write a note..."
                        onClick={expandIt}
                    ></textarea>
                )}
                {expand && (
                    <div className="note-controls">
                        <Tooltip title="Pick a background color" arrow>
                            <input
                                type="color"
                                value={note.backgroundColor}
                                onChange={handleColorChange}
                                className="color-picker"
                                style={{ width: "25px" }}
                            />
                        </Tooltip>
                        <Tooltip title={note.isCheckbox ? "Switch to text" : "Switch to checkbox"} arrow>
                            <button className="toggle-btn" style={{ padding: "5px", borderRadius: "5px", cursor: "pointer" }} type="button" onClick={toggleInputType}>
                                {note.isCheckbox ? "Switch to text" : "Switch to checkbox"}
                            </button>
                        </Tooltip>
                        <Tooltip title="Create note" arrow>
                            <Button onClick={addEvent}>
                                <AddIcon className="plus_sign" />
                            </Button>
                        </Tooltip>
                    </div>
                )}
            </form>
        </div>
    );
};



export default CreateNote;
