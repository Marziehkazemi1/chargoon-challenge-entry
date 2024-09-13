import { Input, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useContext, useMemo, useRef, useState } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import Node from './node';
import SearchResult from './searchResult';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import './index.css';

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: string, node: NodeType) => void;
}

const TreeExtended: React.FC<Props> = ({ handleContextMenuClick }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef<string>('');
  const [searchResultVisible, setSearchResultVisible] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<NodeType[]>([]);
  const { treeData } = useContext(AppContext);
  
  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    searchedKeyword.current = searchInput;
    if (searchInput) {
      const results = searchTree(treeData, searchInput);
      setSearchResults(results);
      setSearchResultVisible(true);
    } else {
      setSearchResults([]);
      setSearchResultVisible(false);
    }
  };

  const handlePressEnter = () => {
    if (searchedKeyword.current) {
      setSearchResultVisible(true);
    }
  }

  const searchTree = (nodes: NodeType[], keyword: string): NodeType[] => {
    let result: NodeType[] = [];
    nodes.forEach(node => {
      if (node.title.includes(keyword)) {
        result.push(node);
      }
      if (node.children) {
        result = result.concat(searchTree(node.children, keyword));
      }
    });
    return result;
  };

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  }

  const handleOpenSearchResult = () => {
    setSearchResultVisible(prevState => !prevState)
  }

  const dmsamd = () => {
    console.log("ksdn")
  }

  return (
    <div className='tree-wrap'>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={dmsamd}
      />
        {searchResults.length > 0 && (
        <div className='search-result-container'>
          <span className='search-arrow' onClick={handleOpenSearchResult}>
            {searchResultVisible ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </span>
          {searchResultVisible && <SearchResult items={searchResults} />}
        </div>
      )}
    </div>
  );
};

export default TreeExtended;
