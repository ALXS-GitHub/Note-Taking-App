import React from 'react'
import { NoteInfo } from '@types'

import './NotePreview.scss'

function NotePreview(props: { note: NoteInfo; onClick: (e:any) => void}) {

    const { note, onClick } = props

    return (
        <div className={`note-preview ${note.isActive ? "active" : null}`} onClick={onClick} >
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