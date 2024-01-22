export type NoteInfo = {
    id: IDBValidKey;
    title: string;
    content: string;
    lastModified: number;
    isPinned: boolean; // for later use
    color: string; // for later use
}