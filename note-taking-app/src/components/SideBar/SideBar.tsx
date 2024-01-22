import React from "react";
import { useState, useEffect } from "react";
import { SideBarButton, NotePreview } from "@components";
// import { createNote, getAllNotes } from "@electron"
import { NoteInfo } from "@types";

import { LuFileSignature } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import "./SideBar.scss";

function SideBar() {

    const [notes, setNotes] = useState<NoteInfo[]>([]);

    const newNote = () => {
        // createNote(
        //     "Untitled Note",
        //     "This is a new note",
        //     new Date().getTime(),
        //     false,
        //     "default"
        // ).then((note) => {
        //     setNotes([note, ...notes]);
        // });
    }

    const deleteNote = () => { // todo: remove because useless on this component
        console.log("Delete Note");
    }

    // useEffect(() => {
    //     getAllNotes().then((notes) => {
    //         setNotes(notes);
    //     });
    //     console.log("Notes: ", notes)
    // }, [newNote, setNotes, deleteNote]);

    

    return (
        <div className="side-bar">
            <div className="side-bar__header">
                <div className="side-bar__header__title">
                    <div className="side-bar__header__title__text">Notes</div>
                </div>
                <div className="side-bar__header__buttons">
                    <SideBarButton onClick={newNote}>
                        <LuFileSignature className="side-bar__header__title__icon" />
                    </SideBarButton>
                    <SideBarButton onClick={deleteNote}>
                        <FaRegTrashCan className="side-bar__header__title__icon" />
                    </SideBarButton>

                </div>
            </div>
            <div className="side-bar__content">
                {notes.map((note) => (
                    <NotePreview key={note.id.toString()} note={note} />
                ))}
            </div>
        </div>
    );
}

export default SideBar;
