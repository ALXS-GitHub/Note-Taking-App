import React, { ComponentProps } from 'react';

import './SideBarButton.scss';

export type SideBarButtonProps = ComponentProps<'button'>;

function SideBarButton ({children, ...props} : SideBarButtonProps) {

    return (
        <button className="side-bar-button" {...props}>
            {children}
        </button>
    );
}

export default SideBarButton;