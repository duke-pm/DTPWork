import { Table } from 'antd';
import React from 'react';
import image from '@fuse/assets/group.png';
import { column } from './ListRoleSettingConfigComponet';

const fakeData = [
	{
		key: 1,
		name: 'John Brown sr.',
		age: 60,
		address: 'New York No. 1 Lake Park',
		children: [
			{
				key: 11,
				name: 'John Brown',
				age: 42,
				address: 'New York No. 2 Lake Park'
			},
			{
				key: 12,
				name: 'John Brown jr.',
				age: 30,
				address: 'New York No. 3 Lake Park',
				children: [
					{
						key: 121,
						name: 'Jimmy Brown',
						age: 16,
						address: 'New York No. 3 Lake Park'
					}
				]
			},
			{
				key: 13,
				name: 'Jim Green sr.',
				age: 72,
				address: 'London No. 1 Lake Park',
				children: [
					{
						key: 131,
						name: 'Jim Green',
						age: 42,
						address: 'London No. 2 Lake Park',
						children: [
							{
								key: 1311,
								name: 'Jim Green jr.',
								age: 25,
								address: 'London No. 3 Lake Park'
							},
							{
								key: 1312,
								name: 'Jimmy Green sr.',
								age: 18,
								address: 'London No. 4 Lake Park'
							}
						]
					}
				]
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
	const [checkStrictly, setCheckStrictly] = React.useState(false);
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows);
		},
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
