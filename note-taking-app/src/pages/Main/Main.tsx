import React from 'react';
import { ResizableBox } from 'react-resizable';
import { Resizable } from '../../constants';

import './Main.scss';

import { SideBar } from '../../components';

function Main() {
    return (
        <div className="main">
            <div className="main__sidebar">
            {/* <Resizable direction="horizontal" > */}
                <SideBar />
            {/* </Resizable> */}
            </div>
        </div>
    );
}

export default Main;