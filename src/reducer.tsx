import { NodeType, ViewModel } from "./types";

type Action =
  | { type: "SET_SHOW_EDIT"; payload: boolean }
  | { type: "SET_CUT_NODE"; payload: NodeType | null }
  | { type: "SET_SHOW_TABLE"; payload: boolean }
  | { type: "SET_SELECTED_ITEM"; payload: any }
  | { type: "SET_TREE_DATA"; payload: NodeType[] };

export const reducer = (state: ViewModel, action: Action): ViewModel => {
  switch (action.type) {
    case "SET_SHOW_EDIT":
      return {
        ...state,
        showEdit: action.payload,
      };
    case "SET_CUT_NODE":
      return {
        ...state,
        cutNode: action.payload,
      };
    case "SET_SHOW_TABLE":
      return {
        ...state,
        showTable: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
    case "SET_TREE_DATA":
      return {
        ...state,
        treeData: action.payload,
      };
    default:
      return state;
  }
};
