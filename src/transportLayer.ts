import { createTableMockData } from "./Components/Table/mockData"
import { createTreeMockData } from "./Components/Tree/mockData"

export async function getAccessList() {
	return [
		{ label: 'ارسال نامه', id: '1' },
		{ label: 'ویرایش نامه', id: '2' },
		{ label: 'مشاهده نامه', id: '3' },
	]
}

export async function getNodes() {
	return createTreeMockData()
}

export async function getTable() {
	return createTableMockData()
}

export async function getUsers() {
	return [
		{ label: 'superadmin', value: 'superadmin' },
		{ label: 'admin', value: 'admin' },
		{ label: 'alireza', value: 'alireza' },
		{ label: 'alirezatest', value: 'alirezatest' },

	]
}