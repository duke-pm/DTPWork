/* eslint-disable no-shadow */
import { Table, Checkbox } from 'antd';
import React, { useState } from 'react';
import image from '@fuse/assets/group.png';

const fakeData = [
	{
		key: 1,
		name: 'Tài sản',
		age: 60,
		address: 'New York No. 1 Lake Park',
		parentID: 3,
		children: [
			{
				key: 11,
				name: 'John Brown',
				age: 42,
				parentID: 0,
				address: 'New York No. 2 Lake Park'
			},
			{
				key: 12,
				name: 'John Brown jr.',
				age: 30,
				parentID: 3,
				address: 'New York No. 3 Lake Park',
				children: [
					{
						key: 121,
						name: 'Jimmy Brown',
						age: 16,
						parentID: 0,
						address: 'New York No. 3 Lake Park'
					}
				]
			},
			{
				key: 13,
				name: 'Jim Green sr.',
				age: 72,
				parentID: 0,
				address: 'London No. 1 Lake Park'
			}
		]
	},
	{
		key: 2,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park'
	}
];

export default function ListRoleSettingBody({ items, classes, handleEditListUser, handleDeleteListUser }) {
	const column = [
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Age',
			dataIndex: 'age',
			width: '12%'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			width: '30%'
		},
		{
			title: 'Read',
			dataIndex: 'read',
			render: (text, record, index) => <>{record.parentID === 0 && <Checkbox />}</>
		},
		{
			title: 'write',
			dataIndex: 'write',
			render: (text, record, index) => <>{record.parentID === 0 && <Checkbox />}</>
		}
	];
	const [checkStrictly, setCheckStrictly] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState(
		fakeData.filter(item => item.age === 60).map(item => item.key)
	);
	const onSelectedRowKeysChange = selectedRowKey => {
		setSelectedRowKeys(selectedRowKey);
	};
	const selectRow = record => {
		const selectedRowKey = [...selectedRowKeys];
		if (selectedRowKey.indexOf(record.key) >= 0) {
			selectedRowKey.splice(selectedRowKey.indexOf(record.key), 1);
		} else {
			selectedRowKey.push(record.key);
		}
		setSelectedRowKeys(selectedRowKey);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectedRowKeysChange,
		// onSelect: (record, selected, selectedRows) => {
		// 	console.log({ record, selected, selectedRows });
		// },
		onSelectAll: (selected, selectedRows, changeRows) => {
			console.log(selected, selectedRows, changeRows);
		}
	};
	return (
		<>
			<Table
				locale={
					<div className="flex items-center justify-center h-auto">
						<img className="rounded-full mx-auto" src={image} alt="" width="384" height="512" />
					</div>
				}
				pagination={false}
				columns={column}
				rowSelection={{ ...rowSelection, checkStrictly }}
				dataSource={fakeData}
			/>
		</>
	);
}
