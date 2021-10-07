/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Table, Spin } from 'antd';
import React from 'react';
import { sortDirestion } from '@fuse/core/DtpConfig';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Text from 'app/components/Text';
import { useTheme } from '@material-ui/core/styles';

export default function TableAssetPay({ entities, listLoading, createSortHandler }) {
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
			fixed: 'left',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Text>{item.assetCode}</Text>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'AssetName',
			sorter: true,
			render: (_, item) => <Text>{item.assetName}</Text>
		},
		{
			title: 'Nhóm tài sản',
			dataIndex: 'groupName',
			key: 'GroupName',
			sorter: true,
			render: (_, item) => <Text>{item.groupName}</Text>
		},
		{
			title: 'Loại tài sản',
			dataIndex: 'groupDetailName',
			key: 'GroupDetailName',
			sorter: true,
			render: (_, item) => <Text>{item.groupDetailName}</Text>
		},
		{
			title: 'Ngày mua',
			dataIndex: 'purchaseDate',
			key: 'PurchaseDate',
			render: (_, item) => <Text>{item.purchaseDate ? moment(item.purchaseDate).format('DD/MM/YYYY') : '-'}</Text>
		},
		{
			title: 'Ngày thanh lý',
			dataIndex: 'transDate',
			key: 'TransDate',
			render: (_, item) => <Text>{item.transDate ? moment(item.transDate).format('DD/MM/YYYY') : '-'}</Text>
		},
		{
			title: 'Mã tham chiếu',
			dataIndex: 'remarks',
			key: 'Remark',
			render: (_, item) => <Text>{item.remarks}</Text>
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="assetCode"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 1500 : 1900,
				y: null
			}}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
