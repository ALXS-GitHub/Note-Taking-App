import React from 'react';
import { useContext } from 'react';
import { ResizableBox } from 'react-resizable';
import { Resizable } from '../../constants';

import { NoteContext } from '../../App';

import './Main.scss';

import { SideBar } from '../../components';
import { Editor, NoteTitle } from '../../components';

function Main() {

    const { currentNote, setCurrentNote } = useContext(NoteContext);

    return (
        <div className="main">
            <div className="main__sidebar">
                <SideBar />
            </div>
            <div className="main__right">
                <div className="main__right__header">
                    <NoteTitle>
                        {currentNote.title}
                    </NoteTitle>
                </div>
                <div className="main__content">
                    <Editor />
                </div>
            </div>
        </div>
    );
}

export default Main;