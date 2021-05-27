/* eslint-disable no-shadow */
import { Table, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '@fuse/assets/group.png';
import __ from 'lodash';
import { findIndexMultiple, findIndexMultipleAsset } from '@fuse/core/DtpConfig';

export default function ListRoleSettingBody({ entities, classes, handleEditListUser, handleDeleteListUser }) {
	// const [checkStrictly, setCheckStrictly] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [newData, setNewData] = useState([]);
	useEffect(() => {
		// const newEntis = entities && entities.filter(item => item.isAccess).map(item => item.menuID);
		// if (newEntis && newEntis.length > 0) {
		// 	setSelectedRowKeys(newEntis);
		// }
		setNewData(entities);
	}, [entities]);
	const onSelectedRowKeysChange = selectedRowKey => {
		setSelectedRowKeys(selectedRowKey);
	};
	const column = [
		{
			title: 'Menu name',
			dataIndex: 'menuName'
		},
		{
			title: 'Access',
			dataIndex: 'isAccess',
			render: (text, record, index) => (
				<>
					{record.parentID !== 0 && (
						<Checkbox checked={record.isAccess} onChange={selectRowAccess('isAccess', record, index)} />
					)}
				</>
			)
		},
		{
			title: 'Read',
			dataIndex: 'isRead',
			render: (text, record, index) => (
				<>
					{record.countChild === 0 && (
						<Checkbox checked={record.isRead} onChange={selectRow('isRead', record, index)} />
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
						<Checkbox checked={record.isWrite} onChange={selectRow('isWrite', record, index)} />
					)}
				</>
			)
		}
	];
	const selectRow = (name, record, indexChild) => e => {
		const dataParent = __.cloneDeep(newData);
		console.log(record);
		const { checked } = e.target;
		const newDataParse = {
			[name]: checked
		};
		const dataChange = findIndexMultiple(record.menuID, newDataParse, dataParent);
		setNewData(dataChange);
	};
	const selectRowAccess = (name, record) => e => {
		const dataParent = __.cloneDeep(newData);
		const findParent = __.cloneDeep(newData.map(item => item.lstPermissionItem)[0]);
		const itemChange = __.find(findParent, item => item.menuID === record.parentID);
		const { checked } = e.target;
		const newDataParse = {
			[name]: checked
		};
		const dataChange = findIndexMultipleAsset(record.menuID, newDataParse, dataParent, itemChange);
		setNewData(dataChange);
	};
	console.log(newData);
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
				// rowSelection={{ ...rowSelection, checkStrictly }}
				dataSource={newData}
			/>
		</>
	);
}
