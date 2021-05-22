import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import * as moment from 'moment';
import { Popover, Table } from 'antd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UnorderedListOutlined } from '@ant-design/icons';
import Icon from '@material-ui/core/Icon';

export default function TableBodyRepair({
	entities,
	lastErrors,
	classes,
	handleOpenFormLiquiAsset,
	handleOpenFormCycleView
}) {
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
			dataIndex: 'remarks',
			key: 'remarks',
			align: 'left',
			title: 'Mã tham chiếu',
			sort: true,
			width: 150
		},
		{
			title: <UnorderedListOutlined />,
			align: 'center',
			key: 'operation',
			fixed: 'right',
			width: 50,
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '19' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem onClick={() => handleOpenFormLiquiAsset(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>shoppingCart</Icon>
									</ListItemIcon>
									<ListItemText primary="Thanh lý tài sản" />
								</MenuItem>
								<MenuItem onClick={() => handleOpenFormCycleView(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>replay</Icon>
									</ListItemIcon>
									<ListItemText primary="Đưa vào sử dụng lại" />
								</MenuItem>
							</>
						)}
						title="Hành động"
					>
						<MoreVertIcon className="cursor-pointer" />
					</Popover>
				</>
			)
		}
	];
	return <Table scroll={{ y: 440 }} pagination={false} columns={rowPossesion} dataSource={entities} />;
}
