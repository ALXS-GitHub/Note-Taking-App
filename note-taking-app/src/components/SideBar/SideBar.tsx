import React from "react";
import { useState, useEffect, useCallback } from "react";
import { SideBarButton, NotePreview } from "@components";
import { createNote, getAllNotes } from "@services"
import { NoteInfo } from "@types";

import { LuFileSignature } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import "./SideBar.scss";

function SideBar() {

    const [notes, setNotes] = useState<NoteInfo[]>([]);
    const [refreshNotes, setRefreshNotes] = useState(false); // only here to refresh the notes when a new note is created (the change of state trigger the useEffect)

    const newNote = (e:any) => {
        e.preventDefault();

        const date = new Date();
        const formattedDate = date.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        createNote(
            "Untitled Note",
            "This is a new note",
            formattedDate,
            false,
            false,
            "default"
        )
        .then(() => {
            setRefreshNotes(!refreshNotes);
        });
    };

    const deleteNote = (e:any) => { // todo: remove because useless on this component
        e.preventDefault();
        console.log("Delete Note");
        setRefreshNotes(!refreshNotes);
    };

    useEffect(() => {
        console.log("SideBar: useEffect");
        getAllNotes().then((notes) => {
            setNotes(notes);
        });
        console.log("Notes: ", notes)
    }, [refreshNotes]);

    

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
