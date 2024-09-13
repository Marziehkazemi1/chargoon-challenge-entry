// @ts-nocheck
import React, { useReducer } from 'react';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';

export function ContextMenuTriggerEx({ id, title }) {
    return (<ContextMenuTrigger
        id={id}
    >
        {title}
    </ContextMenuTrigger>)
}

export function ContextMenuEx({ id, children }) {
    return (<ContextMenu id={id}>
        {children}
    </ContextMenu>)
}

export function ContextMenuItemEx({ title, handleClick }) {
    return (
        <ContextMenuItem onClick={handleClick}>{title}</ContextMenuItem>
    );
}