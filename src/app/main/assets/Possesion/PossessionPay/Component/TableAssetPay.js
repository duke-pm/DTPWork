/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-ui/core';
import { Table, Spin } from 'antd';
import React, { useContext } from 'react';
import { sortDirestion } from '@fuse/core/DtpConfig';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function TableAssetPay({ entities, listLoading, createSortHandler }) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const columns = [
		{
			title: 'Mã tài sản',
			dataIndex: 'assetCode',
			key: 'AssetCode',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.assetCode}</Typography>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'AssetName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.assetName}</Typography>
		},
		{
			title: 'Nhóm tài sản',
			dataIndex: 'groupName',
			key: 'GroupName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.groupName}</Typography>
		},
		{
			title: 'Loại tài sản',
			dataIndex: 'groupDetailName',
			key: 'GroupDetailName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.groupDetailName}</Typography>
		},
		{
			title: 'Ngày mua',
			dataIndex: 'purchaseDate',
			key: 'PurchaseDate',
			render: (_, item) => (
				<Typography variant="body1">
					{item.purchaseDate ? moment(item.purchaseDate).format('DD-MM-YYYY') : ''}
				</Typography>
			)
		},
		{
			title: 'Ngày thanh lý',
			dataIndex: 'transDate',
			key: 'TransDate',
			render: (_, item) => (
				<Typography variant="body1">
					{item.transDate ? moment(item.transDate).format('DD-MM-YYYY') : ''}
				</Typography>
			)
		},
		{
			title: 'Mã tham chiếu',
			dataIndex: 'remarks',
			key: 'Remark',
			render: (_, item) => <Typography variant="body1">{item.remarks}</Typography>
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="assetCode"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 900 : 1900,
				y: null
			}}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
