/* eslint-disable @typescript-eslint/no-var-requires */
// const sqlite3 = window.nodeAPI.sqlite3;
import path from 'node:path';
import { v4 } from 'uuid';
import { NoteInfo } from '@types';
import { Database } from 'sqlite3';

const dbPath = path.join(__dirname, 'notes.db');

console.log('dbPath', dbPath);

const db = new Database(dbPath, (err: any) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the notes database.');
    createTable();
    }
});

const createTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS notes (
        id STRING PRIMARY KEY,
        title TEXT ,
        content TEXT,
        lastModified INTEGER,
        isPinned INTEGER,
        color TEXT
    )`;
    
    db.run(sql, (err: any) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Created notes table');
    });
}

const getAllNotes = () => {
    return new Promise<NoteInfo[]>((resolve, reject) => {
        const sql = `SELECT * FROM notes`;
        db.all(sql, [], (err: any, rows: any) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

const getNote = (id: string) => {
    return new Promise<NoteInfo>((resolve, reject) => {
        const sql = `SELECT * FROM notes WHERE id = ?`;
        db.get(sql, [id], (err: any, row: any) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

const createNote = (
    title: string,
    content: string,
    lastModified: string,
    isPinned: boolean,
    color: string
) => {
    return new Promise<NoteInfo>((resolve, reject) => {
        const sql = `INSERT INTO notes (id, title, content, lastModified, isPinned, color) VALUES (?, ?, ?, ?, ?, ?)`;
        const id = v4();
        db.run(sql, [id, title, content, lastModified, isPinned, color], (err: any) => {
            if (err) {
                reject(err);
            }
            resolve({ id, title, content, lastModified, isPinned, color });
        });
    });
}

export { getAllNotes, getNote, createNote};
