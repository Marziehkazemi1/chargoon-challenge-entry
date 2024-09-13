import { AutoComplete, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../../transportLayer';

interface Props {
  setUserComplete: any;
}

const UserAutoComplete = ({setUserComplete}: Props) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    })
  }, []);


  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter(o => o.label.indexOf(searchText) > -1 )
    );
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
    setUserComplete(data)
  };

  const addUser = () => {
    
  }

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
     <Button onClick={addUser}>افزودن</Button>
    </>
  );
};

export default UserAutoComplete;