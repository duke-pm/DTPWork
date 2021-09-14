/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-ui/core';
import { Table, Checkbox, Spin } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { sortDirestion } from '@fuse/core/DtpConfig';
import ActionsListUserBody from '../ActionListUser/ActionsListUserBody';
// import ActionsGroupUserBody from '../ActionGroupUser/ActionsGroupUserBody';

export default function TableListUser({ entities, listLoading, handleEditListUser, createSortHandler }) {
	// const filterOwner = value => {
	// 	console.log(value);
	// };
	// const onChange = value => {
	// 	console.log(value);
	// };
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const columns = [
		{
			title: 'Mã người dùng',
			dataIndex: 'UserID',
			key: 'UserID',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.userID}</Typography>
		},
		{
			title: 'Tên đăng nhập',
			dataIndex: 'Username',
			key: 'Username',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.userName}</Typography>
		},
		{
			title: 'Họ tên',
			dataIndex: 'LastName',
			key: 'LastName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.fullName}</Typography>
		},
		{
			title: 'Email',
			dataIndex: 'Email',
			key: 'Email',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.email}</Typography>
		},
		{
			title: 'Nhóm người dùng',
			dataIndex: 'UserGroup',
			key: 'UserGroup',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.groupName}</Typography>
		},
		{
			title: 'Inactive',
			dataIndex: 'Inactive',
			key: 'Inactive',
			align: 'center',
			sorter: true,
			render: (_, item) => <Checkbox checked={item.inactive} />
		},
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => <ActionsListUserBody items={item} handleEditListUser={handleEditListUser} />
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="userID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
