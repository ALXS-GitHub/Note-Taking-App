import React from 'react'
import { NoteInfo } from '@types'

import './NotePreview.scss'

function NotePreview(props: { note: NoteInfo }) {

    const { note } = props

    return (
        <div className="note-preview">
            <div className="note-preview__title">
               {note.title} 
            </div>
            <div className="note-preview__last-modified">
                {note.lastModified}
            </div>
        </div>
    )
}

export default NotePreview