import React from 'react'
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, markdownShortcutPlugin } from '@mdxeditor/editor'

import './Editor.scss'

function Editor() {
    return (
        <div className="editor">
            <MDXEditor 
            className="editor__mdxeditor" 
            markdown={"for the **moment** *there* is no content"} 
            plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
            />
        </div>
    )
}

export default Editor