import React from 'react';
import { NodeType } from '../../types';
import { ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
  node: NodeType;
  handleContextMenuClick: (key: string, node: NodeType) => void;
}

function Node({ node, handleContextMenuClick }: Props) {

  const onContextMenuClick = (key: string) => () => handleContextMenuClick(key, node);

  return (
    <div>
      <ContextMenuTriggerEx id={node.key} title={node.title} />
      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx handleClick={onContextMenuClick('add-subsection')} title={'افزودن زیرشاخه'} />
        <ContextMenuItemEx handleClick={onContextMenuClick('cut')} title={'برش'} />
        <ContextMenuItemEx handleClick={onContextMenuClick('paste')} title={'چسباندن'} />
        <ContextMenuItemEx handleClick={onContextMenuClick('remove')} title={'حذف'} />
      </ContextMenuEx>
    </div>
  );
}

export default Node;
