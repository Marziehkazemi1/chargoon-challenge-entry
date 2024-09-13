import React, { useContext } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import OrgchartIcon from '../SvgIcons/orgchart';
import './index.css';
import { Popover, Tree } from 'antd';

interface Props {
  items: (NodeType & { hierarchy: string[] })[];
}

function SearchResult({ items }: Props) {
  const { treeData } = useContext(AppContext);

  const findRoot = (data: any, hierarchy: any) => {
    let ancestors = [];
    let currentData = data;
    for (let i = 0; i < hierarchy.length-1 ; i++) {
      const currentNode = currentData.find((node: any) => node.key === hierarchy[i]);
      if (currentNode) {
        ancestors.push({
          key: currentNode.key,
          title: currentNode.title,
        });
        if (currentNode.children) {
          currentData = currentNode.children;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return ancestors;
  };

  const renderPopoverContent = (hierarchy: any) => {
    const rootTree = findRoot(treeData, hierarchy);
    return rootTree.length > 0 ? (
      <Tree treeData={rootTree} defaultExpandAll />
    ) : null;
  };

  return (
    <div className='search-result' style={{ height: 200, overflow: 'auto' }}>
      {items.map(item => (
        <div className='search-result-title' key={item.key}>
          <h4>{item.title}</h4>
          <Popover content={renderPopoverContent(item.hierarchy)} trigger="click">
            <span className='search-result-icon'>
              <OrgchartIcon />
            </span>
          </Popover>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
