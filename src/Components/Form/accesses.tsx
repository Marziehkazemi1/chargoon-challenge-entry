import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';

interface Props {
	initialValue?: any;
}

//Cannot read properties of undefined (reading 'toString') error 
// can be due to improper formatting of options in Checkbox.Group.
//  We check that the result returned from getAccessList is correct 
//  and has been converted into the appropriate format for use in Checkbox.Group ant design.

function Accesses({ }: Props) {
	const [options, setOptions] = useState<{ label: string, value: string }[]>([]);

	const fetchAccessList = async () => {
		const result = await getAccessList();
		const formatOptions = result.map((option: any) => ({
			label: option.label?.toString() || "option",  //default for label
			value: option.id?.toString() || "value"  //default for value
		}))
		setOptions(formatOptions);
	}

	useEffect(() => {
		fetchAccessList()
	}, [])

	function handleOnChange(checkedValues: any) {
		const checkedLabels = checkedValues.map((checkedValue: string) => {
		  const foundOption = options.find(option => option.value === checkedValue);
		  return foundOption ? foundOption.label : null;
		}).filter((label: any) => label !== null);
	}

	return (
		<Checkbox.Group options={options} onChange={handleOnChange}/>
	);
}
export default Accesses