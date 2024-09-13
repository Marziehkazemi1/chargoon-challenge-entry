import React, { useState, useEffect } from 'react';
import './index.css';
import { getTable } from '../../transportLayer';
import { NodeType } from '../../types';

interface Props {
  tableValue: NodeType[];
}

// At first, the table is empty, after clicking add sub-branch, 
// filling in the title and code, and registering, the table will be filled

function Table({ tableValue }: Props) {
  const [tableData, setTableData] = useState<NodeType[]>([]);

  const fetchTableData = async () => {
    const result = await getTable();
    setTableData(result);
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    setTableData(tableValue);
  }, [tableValue]);

  const handleDeleteItem = (key: string) => {
    const filteredTableData = tableData.filter((item: NodeType) => item.key !== key);
    setTableData(filteredTableData);
  }

  const handleDefaultChange = (key: string) => {
    const updatedTableData = tableData.map((item: NodeType) => ({
      ...item,
      isDefault: item.key === key,
    }));
    setTableData(updatedTableData);
  }

  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>عملیات</th>
            <th>پیش فرض</th>
            <th>کد</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.key}>
              <td onClick={() => handleDeleteItem(item.key)}>حذف</td>
			        <td><input type='checkbox' onChange={() => handleDefaultChange(item.key)}/></td>
              <td>{item.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='save-btn'>ذخیره</button>
    </div>
  );
}

export default Table;
