/* eslint-disable no-shadow */
import { Table, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '@fuse/assets/group.png';
import { findIndexMultiple } from '@fuse/core/DtpConfig';
import __ from 'lodash';

export default function ListRoleSettingBody({ entities, classes, handleEditListUser, handleDeleteListUser }) {
	const [checkStrictly, setCheckStrictly] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [newData, setNewData] = useState([]);
	useEffect(() => {
		const newEntis = entities && entities.filter(item => item.isAccess).map(item => item.menuID);
		if (newEntis && newEntis.length > 0) {
			setSelectedRowKeys(newEntis);
		}
		setNewData(entities);
	}, [entities]);
	const onSelectedRowKeysChange = selectedRowKey => {
		setSelectedRowKeys(selectedRowKey);
	};
	const selectRow = (name, record, indexChild) => e => {
		const dataParent = __.cloneDeep(newData);
		const newDataParse = {
			[name]: e.target.checked
		};
		const abc = findIndexMultiple(record.menuID, newDataParse, dataParent);
		console.log(abc);
	};
	const column = [
		{
			title: 'Menu name',
			dataIndex: 'menuName'
		},
		{
			title: 'Read',
			dataIndex: 'isRead',
			render: (text, record, index) => (
				<>
					{record.countChild === 0 && (
						<Checkbox defaultChecked={record.isRead} onChange={selectRow('isRead', record, index)} />
					)}
				</>
			)
		},
		{
			title: 'write',
			dataIndex: 'isWrite',
			render: (text, record, index) => (
				<>
					{record.countChild === 0 && (
						<Checkbox defaultChecked={record.isWrite} onChange={selectRow('isWrite', record, index)} />
					)}
				</>
			)
		}
	];
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectedRowKeysChange,
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
				rowKey="menuID"
				childrenColumnName="lstPermissionItem"
				rowSelection={{ ...rowSelection, checkStrictly }}
				dataSource={entities}
			/>
		</>
	);
}
