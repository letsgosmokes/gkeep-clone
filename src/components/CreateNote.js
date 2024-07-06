import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import "./styles.css";
import ColorLensIcon from '@material-ui/icons/ColorLens'; // Import ColorLensIcon from Material-UI


const CreateNote = (props) => {
    const [expand, setExpand] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: "",
        backgroundColor: "#fff" // Initial background color
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

    const handleColorChange = (color) => {
        setNote((prevData) => ({
            ...prevData,
            backgroundColor: color
        }));
    };

    return (
        <div className='main_note' onDoubleClick={bToNormal}>
            <form>
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
                {expand &&
                    <Button onClick={addEvent}>
                        <AddIcon className="plus_sign" />
                    </Button>
                }
            </form>
        </div>
    );
};


export default CreateNote;