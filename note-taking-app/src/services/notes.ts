/* eslint-disable @typescript-eslint/no-var-requires */
import { ipcRenderer } from 'electron';
import { v4 } from 'uuid';

const getAllNotes = async () => {
    const sql = `SELECT * FROM notes`;
    const rows = await ipcRenderer.invoke('query-db', sql);
    return rows;
}

const getNote = (id: string) => {
    const sql = `SELECT * FROM notes WHERE id = ?`;
    return ipcRenderer.invoke('query-db', sql, id);
}

const createNote = (
    title: string,
    content: string,
    lastModified: number,
    isPinned: boolean,
    color: string
) => {
    const sql = `INSERT INTO notes (id, title, content, lastModified, isPinned, color) VALUES (?, ?, ?, ?, ?, ?)`;
    const id = v4();
    return ipcRenderer.invoke('query-db', sql, id, title, content, lastModified, isPinned, color);
}

export { getAllNotes, getNote, createNote};
