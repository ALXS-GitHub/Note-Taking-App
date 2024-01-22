/* eslint-disable */
import { v4 } from "uuid";
import { NoteInfo } from "../types";

const openRequest = indexedDB.open("Notes", 1);

function getNote(id: IDBValidKey) {
    return new Promise<NoteInfo>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const transaction = db.transaction("notes", "readonly");
            const store = transaction.objectStore("notes");
            const request = store.get(id);
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        };
    });
}

function getAllNotes() {
    return new Promise<NoteInfo[]>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const transaction = db.transaction("notes", "readonly");
            const store = transaction.objectStore("notes");
            const request = store.getAll();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        };
    });
}

function createNote(
    title: string,
    content: string,
    lastModified: number,
    isPinned: boolean,
    color: string
) {
    return new Promise<NoteInfo>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const transaction = db.transaction("notes", "readwrite");
            const store = transaction.objectStore("notes");
            const id = v4();
            const request = store.add({
                id,
                title,
                content,
                lastModified,
                isPinned,
                color,
            });
            request.onsuccess = () => {
                resolve({
                    id,
                    title,
                    content,
                    lastModified,
                    isPinned,
                    color,
                });
            };
            request.onerror = () => {
                reject(request.error);
            };
        };
    });
}

function ping() {
    console.log('pong')
}

export { openRequest, getNote, getAllNotes, createNote, ping };