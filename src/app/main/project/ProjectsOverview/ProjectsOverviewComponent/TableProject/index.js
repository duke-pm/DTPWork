/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Avatar, Progress } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { Icon, Typography } from '@material-ui/core';
import clsx from 'clsx';
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
			width: '15%',
			render: (_, item) => (
				<Typography variant={item.codeParentID === 'P0' ? 'subtitle2' : 'body1'} component="button">
					{item.itemName}
				</Typography>
			)
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			key: 'duration',
			align: 'center',
			width: '4%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 rounded-16 ',
						'text-blue'
					)}
				>
					<Icon className="text-16">check_circle</Icon>
					<Typography className="ml-8" variant="subtitle1" component="button">
						{item.duration} Days
					</Typography>{' '}
				</div>
			)
		},
		{
			title: 'Start',
			align: 'center',
			dataIndex: 'startDate',
			key: 'startDate',
			width: '4%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green rounded-16'
					)}
				>
					<Icon className="text-16">access_time</Icon>
					<Typography className="ml-8" variant="body1">
						{item.startDate && moment(item.startDate).format('DD/MM/YY')}
					</Typography>
				</div>
			)
		},
		{
			title: 'Finish',
			align: 'center',
			dataIndex: 'endDate',
			key: 'endDate',
			width: '4%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green  rounded-16'
					)}
				>
					<Icon className="text-16">access_time</Icon>
					<Typography className="ml-8" variant="body1">
						{item.endDate && moment(item.endDate).format('DD/MM/YY')}
					</Typography>
				</div>
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
			rowKey="codeID"
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
