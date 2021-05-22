import { MenuItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Popover, Table, Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UnorderedListOutlined } from '@ant-design/icons';

export default function TableBodyUsed({ entities, handleOpenForm, handleOpenFromService }) {
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
			render: (_, item) => (
				<Tag
					color={item.isProcessing ? (item.requestTypeName === 'Đã báo hỏng' ? 'purple' : 'red') : '#87d068'}
				>
					{item.isProcessing ? item.requestTypeName : 'Đang sử dụng'}
				</Tag>
			)
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
							<div>
								<MenuItem onClick={() => handleOpenForm(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>backspace</Icon>
									</ListItemIcon>
									<ListItemText primary="Thu hồi tài sản" />
								</MenuItem>
								<MenuItem onClick={() => handleOpenFromService(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>build</Icon>
									</ListItemIcon>
									<ListItemText primary="Sửa chữa bảo hành tài sản" />
								</MenuItem>
							</div>
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
	// return (
	// <TableBody>
	// 	{entities &&
	// 		entities.map(items => (
	// 			<TableRow key={items.assetID} hover>
	// 				<TableCell align="left" className="p-4 md:p-12">
	// 					{!items.isProcessing && (
	// 						<Popover
	// 							overlayStyle={{ zIndex: '19' }}
	// 							placement="rightTop"
	// 							content={() => (
	// 								<PossesionActionUsed
	// 									handleOpenFromService={handleOpenFromService}
	// 									handleOpenForm={handleOpenForm}
	// 									items={items}
	// 								/>
	// 							)}
	// 							title="Hành động"
	// 						>
	// 							<MoreVertIcon className="cursor-pointer" />
	// 						</Popover>
	// 					)}
	// 				</TableCell>
	// 				<TableCell align="left"> {items.assetCode} </TableCell>
	// 				<TableCell align="left">{items.assetName} </TableCell>
	// 				<TableCell align="left">{items.groupName}</TableCell>
	// 				<TableCell align="left">{items.groupDetailName}</TableCell>
	// 				<TableCell align="left">{moment(items.purchaseDate).format('DD-MM-YYYY')} </TableCell>
	// 				<TableCell align="left">{items.deptNameManager}</TableCell>
	// 				<TableCell align="left"> {items && items.empName ? items.empName : null}</TableCell>
	// 				<TableCell align="left">{items.regionName}</TableCell>
	// 				<TableCell align="left">
	// 					<div
	// 						className={`inline text-12 p-4 rounded-full truncate ${
	// 							items.isProcessing
	// 								? items.requestTypeName === 'Đã báo hỏng'
	// 									? 'bg-purple text-white'
	// 									: 'bg-red-700 text-white'
	// 								: 'bg-green text-white'
	// 						}`}
	// 					>
	// 						{items.isProcessing ? items.requestTypeName : 'Đang sử dụng'}
	// 					</div>
	// 				</TableCell>
	// 				<TableCell align="left"> {items.remarks} </TableCell>
	// 			</TableRow>
	// 		))}
	// </TableBody>
	// );
}
