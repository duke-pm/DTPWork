import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

export default function TableBodyPay({ entities }) {
	const rowPossesion = [
		{
			title: 'Mã tài sản',
			dataIndex: 'assetCode',
			key: 'assetCode',
			sort: true,
			width: 150
		},
		{
			dataIndex: 'assetName',
			key: 'assetName',
			align: 'left',
			title: 'Tên tài sản',
			sort: true,
			width: 190
		},
		{
			key: 'groupName',
			dataIndex: 'groupName',
			align: 'left',
			title: 'Nhóm tài sản',
			sort: true,
			width: 150
		},
		{
			id: 'groupDetailName',
			dataIndex: 'groupDetailName',
			align: 'left',
			title: 'Loại tài sản',
			sort: true,
			width: 150
		},
		{
			id: 'PurchaseDate',
			align: 'left',
			title: 'Ngày mua',
			sort: true,
			width: 150,
			render: (_, item) => (
				<div>
					<p> {moment(item.purchaseDate).format('DD/MM/YYYY')} </p>{' '}
				</div>
			)
		},
		{
			dataIndex: 'deptNameManager',
			key: 'deptNameManager',
			align: 'left',
			title: 'BP Quản lý',
			sort: true,
			width: 210
		},
		{
			dataIndex: 'empName',
			key: 'empName',
			align: 'left',
			title: 'Nhân viên quản lý',
			sort: true,
			width: 210
		},
		{
			dataIndex: 'regionName',
			key: 'regionName',
			align: 'left',
			title: 'Khu vực',
			sort: true,
			width: 150
		},
		{
			dataIndex: 'remarks',
			key: 'remarks',
			align: 'left',
			title: 'Mã tham chiếu',
			sort: true,
			width: 150
		}
	];
	return <Table scroll={{ y: 440 }} pagination={false} columns={rowPossesion} dataSource={entities} />;
}
