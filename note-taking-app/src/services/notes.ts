/* eslint-disable @typescript-eslint/no-var-requires */
import { v4 } from 'uuid';
import { NoteInfo } from "@types";


const getAllNotes = async () :Promise<NoteInfo[]>  => {
    const sql = `SELECT * FROM notes`;
    const rows = await window.ipcRenderer.invoke('db-query', sql);
    return rows;
}

const getNote = (id: string) :Promise<any> => {
    const sql = `SELECT * FROM notes WHERE id = ?`;
    return window.ipcRenderer.invoke('db-query', sql, id);
}

const createNote = (
    title: string,
    content: string,
    lastModified: string,
    isActive: boolean,
    isPinned: boolean,
    color: string
) => {
    const sql = `INSERT INTO notes (id, title, content, lastModified, isActive, isPinned, color) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const id = v4();
    console.log('createNote', id, title, content, lastModified, isPinned, color);
    return window.ipcRenderer.invoke('db-insert', { sql, params: [id, title, content, lastModified, isActive, isPinned, color] });
}

const deleteNote = (id: string) => {
    const sql = `DELETE FROM notes WHERE id = ?`;
    return window.ipcRenderer.invoke('db-delete', { sql, params: [id] });
}

export { getAllNotes, getNote, createNote, deleteNote};
