import { useEffect, useState, useReducer } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree';
import { getNodes } from "./transportLayer";
import { NodeType, ViewModel } from "./types";
import { reducer } from "./reducer";

const initialState : ViewModel = {
  showEdit: true,
  cutNode: null,
  showTable: false,
  selectedItem: null,
  treeData: [],
  item: null
}

function App() {
  const [parentNodeKey, setParentNodeKey] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showEdit, cutNode, showTable, selectedItem, treeData } = state;

  const fetchTreeData = async () => {
    const result = await getNodes();
    dispatch({ type: "SET_TREE_DATA", payload: result });
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const handleContextMenuClick = (actionKey: any, node: NodeType) => {
    switch (actionKey) {
      case "remove":
        handleRemoveNode(node);
        break;
      case "cut":
        handleCutNode(node);
        break;
      case "paste":
        handlePasteNode(node);
        break;
      case "add-subsection":
        handleAddSubsection(node);
        break;
      default:
        break;
    }
  };

  const handleRemoveNode = (node: NodeType) => {
    const newTreeData = removeNode(treeData, node.key);
    dispatch({ type: "SET_TREE_DATA", payload: newTreeData });
  };

  const removeNode = (nodes: NodeType[], key: string) => {
    return nodes.filter((item) => {
      if (item.key === key && (!item.children || item.children.length === 0)) {
        return false;
      }
      if (item.children) {
        item.children = removeNode(item.children, key);
      }
      return true;
    });
  };

  const handleCutNode = (node: NodeType) => {
    if (node.children && node.children.length > 0) return;
    dispatch({ type: "SET_CUT_NODE", payload: node });
  };

  const handlePasteNode = (node: NodeType) => {
    if (cutNode) {
      const newTreeData = removeNode(treeData, cutNode.key);
      const updatedTreeData = addNode(newTreeData, node.key, cutNode);
      dispatch({ type: "SET_TREE_DATA", payload: updatedTreeData });
      dispatch({ type: "SET_CUT_NODE", payload: null });
    }
  };

  const addNode = (nodes: NodeType[], key: string, newNode: NodeType) => {
    return nodes.map((item) => {
      if (item.key === key) {
        return { ...item, children: [...(item.children || []), newNode] };
      }
      if (item.children) {
        item.children = addNode(item.children, key, newNode);
      }
      return item;
    });
  };

  const handleAddSubsection = (node: NodeType) => {
    dispatch({ type: "SET_SHOW_TABLE", payload: true });
    setParentNodeKey(node.key);
  };

  const handleUpdateTree = (nodes: NodeType[]) => {
    dispatch({ type: "SET_TREE_DATA", payload: nodes });
  };

  const handleUpdateNode = (key: string, data: any) => {
    if (parentNodeKey) {
      const newNode = { key: new Date().getTime().toString(), ...data };
      const updatedTreeData = addNode(treeData, parentNodeKey, newNode);
      dispatch({ type: "SET_TREE_DATA", payload: updatedTreeData });
      setParentNodeKey(null);
      dispatch({ type: "SET_SHOW_TABLE", payload: false });
    }
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && 
        <Form
         item={selectedItem} 
         showTable={showTable} 
         updateNode={handleUpdateNode} />
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;

