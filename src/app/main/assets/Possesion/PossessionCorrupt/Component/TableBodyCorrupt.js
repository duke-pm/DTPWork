import { MenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import React from 'react';
import * as moment from 'moment';
import { Popover, Table, Tag } from 'antd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UnorderedListOutlined } from '@ant-design/icons';
import { chipColor, chipText } from '../PossesionRepairConfig';

export default function TableBodyCorrupt({
	entities,
	lastErrors,
	classes,
	handleOpenFormLiquiAsset,
	handleOpenFormCycleView,
	handleOpenFormService
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
			dataIndex: 'regionName',
			key: 'regionName',
			align: 'left',
			title: 'Khu vực',
			sort: true,
			width: 150
		},
		{
			id: 'StatusName',
			align: 'left',
			title: 'Trạng thái',
			sort: true,
			width: 150,
			render: (_, item) => <Tag color={chipColor[item.statusID]}>{chipText[item.statusID]}</Tag>
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
								<MenuItem onClick={() => handleOpenFormService(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>build</Icon>
									</ListItemIcon>
									<ListItemText primary="Sửa chữa bảo hành tài sản" />
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
