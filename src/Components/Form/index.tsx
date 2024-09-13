import { Input, Tabs } from 'antd';
import React, { useState } from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';

interface Props {
  item: any;
  showTable: boolean;
  updateNode: (key: string, data: any) => void;
}

function Form({ item, updateNode, showTable }: Props) {
  const [formData, setFormData] = useState({});

  const handleSave = () => {
    updateNode('key', formData);
  };

  return (
    <div className='detail'>
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className='form-content'>
              <BasicInformation
                initialValue={item?.data?.basicInformation}
                showTable={showTable}
                onFormChange={setFormData}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className='form-content'>
              <ErrorBoundry>
                <Accesses initialValue={item?.data?.accesses} />
                <button className='save-btn' onClick={handleSave}>ذخیره</button>
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={[]} />
    </div>
  );
}

export default Form;
