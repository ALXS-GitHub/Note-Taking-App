import React from 'react';
import { ResizableBox } from 'react-resizable';
import { Resizable } from '../../constants';

import './Main.scss';

import { SideBar } from '../../components';
import { Editor, NoteTitle } from '../../components';

function Main() {
    return (
        <div className="main">
            <div className="main__sidebar">
                <SideBar />
            </div>
            <div className="main__right">
                <div className="main__right__header">
                    <NoteTitle>
                        Note Title
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