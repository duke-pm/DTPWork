import { Popover, Table } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as moment from 'moment';
import { UnorderedListOutlined } from '@ant-design/icons';
import { MenuItem, ListItemText, ListItemIcon, Icon } from '@material-ui/core';

function TableBodyUnUsed({ handleOpenForm, handleOpenFormEdit, entities, lastErrors }) {
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
			id: 'originalPrice',
			align: 'left',
			title: 'Nguyên giá',
			sort: true,
			width: 150,
			render: (_, item) => <div>{currencyFormat(item.originalPrice)}</div>
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
								<MenuItem onClick={() => handleOpenForm(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>add</Icon>
									</ListItemIcon>
									<ListItemText primary="Cấp phát tài sản" />
								</MenuItem>
								<MenuItem onClick={() => handleOpenFormEdit(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>edit</Icon>
									</ListItemIcon>
									<ListItemText primary="Cập nhật tài sản" />
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
	return (
		<Table
			className="virtual-table"
			scroll={{ y: 440 }}
			pagination={false}
			columns={rowPossesion}
			dataSource={entities}
		/>
	);
}
export default TableBodyUnUsed;
