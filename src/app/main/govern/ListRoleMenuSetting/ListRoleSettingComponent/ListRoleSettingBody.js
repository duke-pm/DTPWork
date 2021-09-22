/* eslint-disable no-shadow */
import { Table, Checkbox, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '@fuse/assets/group.png';
import __ from 'lodash';
import { findIndexMultiple, findIndexMultipleAsset } from '@fuse/core/DtpConfig';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';

export default function ListRoleSettingBody({ entities, newData, setNewData, actionLoading, listLoading }) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
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
			title: 'Menu Name',
			dataIndex: 'menuName',
			render: (_, item) => (
				<Typography variant="body1" component="button">
					{item.menuName}
				</Typography>
			)
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
			title: 'Write',
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
				className="virtual-table"
				pagination={false}
				columns={column}
				scroll={{ x: matchesSM && 580 }}
				loading={actionLoading && <Spin />}
				rowKey="menuID"
				onExpandedRowsChange={onSelectedRowKeysChange}
				expandedRowKeys={selectedRowKeys}
				childrenColumnName="lstPermissionItem"
				expandable={{
					expandRowByClick: false,
					expandIconAsCell: false,
					expandIconColumnIndex: 0,
					expandIcon: ({ expanded, onExpand, record, expandable }) =>
						expandable.length === 0 ? null : expanded ? (
							<CaretUpOutlined onClick={e => onExpand(record, e)} style={{ fontSize: '10pt' }} />
						) : (
							<CaretDownOutlined onClick={e => onExpand(record, e)} style={{ fontSize: '10pt' }} />
						)
				}}
				// rowSelection={{ ...rowSelection, checkStrictly }}
				dataSource={newData}
			/>
		</>
	);
}
