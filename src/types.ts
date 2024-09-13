export interface UserType {
	title: string;
	isDefault: boolean;
}
export interface NodeType {
	title: string;
	users: UserType[];
	key: string;
	children?: NodeType[];
	parentKey?: string;
	data?: any[];
	hierarchy: string[];
	accesses: string[];
	code?: string;
}

export interface ViewModel {
	showEdit?: boolean;
	cutNode: NodeType;
	showTable: boolean;
	selectedItem: any;
	treeData: any[];
	item?: any
}

export interface TableType {
	key: string;
	code: string;
	isDefault: boolean;
}