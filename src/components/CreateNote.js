import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import "./styles.css";

const CreateNote = (props) => {
    const [expand, setExpand] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: "",
        backgroundColor: "#fff"
    });

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setNote((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addEvent = () => {
        props.passNote(note);
        setNote({
            title: "",
            content: "",
            backgroundColor: "#fff" // Reset background color after adding note
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

    return (
        <div className='main_note' onDoubleClick={bToNormal}>
            <form style={{ backgroundColor: note.backgroundColor }} >
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
                <textarea
                    rows=""
                    column=""
                    name="content"
                    value={note.content}
                    onChange={InputEvent}
                    placeholder="Write a note..."
                    onClick={expandIt}
                    style={{ backgroundColor: note.backgroundColor }}
                ></textarea>
                {expand && (
                    <div className="note-controls">
                        <input
                            type="color"
                            value={note.backgroundColor}
                            onChange={handleColorChange}
                            className="color-picker"
                            style={{ width: "25px" }}
                        />
                        <Button onClick={addEvent}>
                            <AddIcon className="plus_sign" />
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateNote;
