import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import UserAutoComplete from './user-autocomplete';
import Table from '../Table';
import { NodeType } from '../../types';

interface Props {
  initialValue?: any;
  showTable: boolean;
  onFormChange: (data: any) => void;
}

function BasicInformation({ initialValue, showTable, onFormChange }: Props) {
  const [form] = Form.useForm();
  const [tableValue, setTableValue] = useState<NodeType[]>([]);
  const [usersComplete, setUserComplete] = useState();

  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [initialValue]);

  const onValuesChange = (changedValues: any, allValues: any) => {
    onFormChange(allValues);
  };

  const onSubmit = (value: any) => {
        const newItem: NodeType = {
          key: new Date().getTime().toString(),
          ...value,
        };
        setTableValue([...tableValue, newItem]);
    	form.resetFields();
      }

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={initialValue}
      onFinish={onSubmit}
    >
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete setUserComplete={setUserComplete} />
      </Form.Item>
      {showTable && <Table tableValue={tableValue} />}
    </Form>
  );
}

export default BasicInformation;
