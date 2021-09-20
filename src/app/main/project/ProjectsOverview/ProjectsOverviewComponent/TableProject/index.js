/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Avatar, Progress, Spin } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Text from 'app/components/Text';

function TableProject(props) {
	const theme = useTheme();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const { entities, listLoading } = props;

	const array = [];
	const mapDataKey = useCallback(
		arr => {
			arr.forEach(item => {
				array.push(item.codeID);
				if (item.lstItemChild.length) {
					mapDataKey(item.lstItemChild);
				}
			});
		},
		[array]
	);

	useEffect(() => {
		mapDataKey(entities);
		if (array?.length > 0) {
			setSelectedRowKeys(array);
		}
	}, [entities]);
	const onSelectedRowKeysChange = selectedRowKey => {
		setSelectedRowKeys(selectedRowKey);
	};
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const columns = [
		{
			title: 'Task Name',
			dataIndex: 'prjName',
			key: 'itemName',
			fixed: 'left',
			width: '10%',
			render: (_, item) => {
				return (
					<Typography variant={item.codeParentID === 'P0' ? 'subtitle2' : 'body1'} component="button">
						{item.itemName}
					</Typography>
				);
			}
		},
		{
			title: 'Start Date',
			align: 'center',
			dataIndex: 'startDate',
			key: 'startDate',
			width: '4%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 bg-green-50 rounded-16">
					<Text>{item.startDate && moment(item.startDate).format('DD/MM/YY')}</Text>
				</div>
			)
		},
		{
			title: 'End Date',
			align: 'center',
			dataIndex: 'endDate',
			key: 'endDate',
			width: '4%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 bg-green-50 rounded-16">
					<Text>{item.endDate && moment(item.endDate).format('DD/MM/YY')}</Text>
				</div>
			)
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			key: 'duration',
			align: 'center',
			width: '4%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 mx-4 rounded-16 text-blue">
					<Text>{item.duration} Days</Text>
				</div>
			)
		},
		{
			title: 'Recource Names',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '5%',
			render: (_, item) => (
				<div className="flex flex-row items-center">
					<Avatar style={{ backgroundColor: item.colorCode }} icon={<UserOutlined />} />
					<Text className="ml-8">{item.ownerName}</Text>
				</div>
			)
		},
		{
			title: 'Progress',
			align: 'center',
			dataIndex: 'completedPercent',
			key: 'completedPercent',
			width: '7%',
			render: (_, item) => <Progress percent={item.completedPercent} strokeColor={item.colorCode} />
		}
	];
	return (
		<Table
			rowKey="codeID"
			expandable={{
				expandRowByClick: false,
				expandIconAsCell: false,
				expandIconColumnIndex: 0,
				expandedRowKeys: selectedRowKeys,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? (
						<CaretUpOutlined className="w-20" style={{ color: 'white' }} />
					) : expanded ? (
						<CaretUpOutlined className="w-20" onClick={e => onExpand(record, e)} />
					) : (
						<CaretDownOutlined className="w-20" onClick={e => onExpand(record, e)} />
					),
				onExpandedRowsChange: onSelectedRowKeysChange
			}}
			childrenColumnName="lstItemChild"
			pagination={false}
			scroll={{ x: entities && entities.length ? (matches ? 1520 : 1540) : matchesSM ? 1540 : null }}
			columns={columns}
			dataSource={entities}
		/>
	);
}

export default withRouter(TableProject);
