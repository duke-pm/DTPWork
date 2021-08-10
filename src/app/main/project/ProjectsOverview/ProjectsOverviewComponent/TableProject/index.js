/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Avatar, Progress } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function TableProject(props) {
	const theme = useTheme();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const { entities } = props;

	const array = [];
	const mapDataKey = useCallback(
		arr => {
			arr.forEach(item => {
				array.push(item.itemID);
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
			width: '15%',
			ellipsis: {
				showTitle: false
			},
			render: (_, item) => (
				<Typography variant={item.codeParentID === 'P0' ? 'subtitle2' : 'body1'} component="button">
					{item.itemName}
				</Typography>
			)
		},
		{
			title: 'Duration',
			align: 'center',
			dataIndex: 'duration',
			key: 'duration',
			width: '6%',
			render: (_, item) => (
				<Typography
					variant="subtitle1"
					component="button"
					style={{ color: item.duration < 3 ? '#FF3F00' : '#71EFA3' }}
				>
					{item.duration} Days
				</Typography>
			)
		},
		{
			title: 'Start',
			align: 'center',
			dataIndex: 'startDate',
			key: 'startDate',
			width: '5%',
			render: (_, item) => (
				<Typography variant="body1">{item.startDate && moment(item.startDate).format('DD/MM/YYYY')}</Typography>
			)
		},
		{
			title: 'Finish',
			align: 'center',
			dataIndex: 'endDate',
			key: 'endDate',
			width: '5%',
			render: (_, item) => (
				<Typography variant="body1">{item.endDate && moment(item.endDate).format('DD/MM/YYYY')}</Typography>
			)
		},
		{
			title: 'Recource Names',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '6%',
			render: (_, item) => (
				<div className="flex flex-row items-center">
					<Avatar size={32} style={{ backgroundColor: item.colorCode }} icon={<UserOutlined />} />
					<Typography className="ml-8" variant="body1">
						{item.ownerName}
					</Typography>
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
			rowKey="itemID"
			expandable={{
				expandRowByClick: false,
				expandIconAsCell: false,
				expandIconColumnIndex: 0,
				expandedRowKeys: selectedRowKeys,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? (
						<CaretUpOutlined className="w-40" style={{ color: 'white' }} />
					) : expanded ? (
						<CaretUpOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
					) : (
						<CaretDownOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
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
