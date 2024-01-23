import React, { ComponentProps } from 'react';

import './NoteTitle.scss';

export type NoteTitleProps = ComponentProps<'div'>;

function NoteTitle({children, ...props} : NoteTitleProps) {
    return (
        <div className="note-title" {...props}>
            {children}
        </div>
    )
}

export default NoteTitle