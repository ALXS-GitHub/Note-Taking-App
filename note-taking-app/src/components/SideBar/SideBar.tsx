import React from "react";
import { useState, useEffect, useContext } from "react";
import { SideBarButton, NotePreview } from "@components";
import { createNote, getAllNotes, deleteNote } from "@services"
import { NoteInfo } from "@types";

import { LuFileSignature } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

import { NoteContext } from "../../App";

import "./SideBar.scss";

function SideBar() {

    const { currentNote, setCurrentNote } = useContext(NoteContext);

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

    const handleDelete = (e:any) => { // todo: remove because useless on this component
        e.preventDefault();
        console.log("Delete Note");

        if (currentNote.id === undefined || currentNote.id === null || currentNote.id === "") {
            return;
        }

        deleteNote(
            currentNote.id.toString()
        ).then(() => {
            setCurrentNote({} as NoteInfo);
            setRefreshNotes(!refreshNotes);
        });
    };

    const handleClick = (id: string) => {
        console.log("SideBar: handleClick");
        console.log("id: ", id);
        const note = notes.find((note) => note.id.toString() === id);
        setCurrentNote(note!);
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
                    <SideBarButton onClick={handleDelete}>
                        <FaRegTrashCan className="side-bar__header__title__icon" />
                    </SideBarButton>

                </div>
            </div>
            <div className="side-bar__content">
                {notes.map((note) => (
                    <NotePreview key={note.id.toString()} note={note} onClick={(e:any) => handleClick(note.id.toString())} />
                ))}
            </div>
        </div>
    );
}

export default SideBar;
