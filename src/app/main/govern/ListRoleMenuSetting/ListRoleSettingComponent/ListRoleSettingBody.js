/* eslint-disable no-shadow */
import { Table, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '@fuse/assets/group.png';
import __ from 'lodash';
import { findIndexMultiple, findIndexMultipleAsset } from '@fuse/core/DtpConfig';

export default function ListRoleSettingBody({ entities, newData, setNewData, actionLoading }) {
	// const [checkStrictly, setCheckStrictly] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	useEffect(() => {
		const newEntis = entities && entities.map(item => item.menuID);
		if (newEntis && newEntis.length > 0) {
			setSelectedRowKeys(newEntis);
		}
		setNewData(entities);
	}, [entities, setNewData]);
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
		const { checked } = e.target;
		const newDataParse = {
			[name]: checked
		};
		const dataChange = findIndexMultipleAsset(record.menuID, newDataParse, dataParent);
		setNewData(dataChange);
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
				loading={actionLoading}
				rowKey="menuID"
				onExpandedRowsChange={onSelectedRowKeysChange}
				expandedRowKeys={selectedRowKeys}
				childrenColumnName="lstPermissionItem"
				// rowSelection={{ ...rowSelection, checkStrictly }}
				dataSource={newData}
			/>
		</>
	);
}