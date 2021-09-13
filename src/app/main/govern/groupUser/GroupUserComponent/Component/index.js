/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-ui/core';
import { Table, Popover, Checkbox, Spin } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { sortDirestion } from '@fuse/core/DtpConfig';
import ActionsGroupUserBody from '../ActionGroupUser/ActionsGroupUserBody';

export default function TableGroupUser({ entities, listLoading, handleEditGroupUser, createSortHandler }) {
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
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => (
				<Popover
					overlayStyle={{ zIndex: '19' }}
					placement="rightTop"
					content={() => <ActionsGroupUserBody items={item} handleEditGroupUser={handleEditGroupUser} />}
					title="Hành động"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Mã nhóm',
			dataIndex: 'groupID',
			key: 'groupID',
			sorter: true,
			defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.groupID}</Typography>
		},
		{
			title: 'Tên nhóm',
			dataIndex: 'groupName',
			key: 'groupName',
			render: (_, item) => <Typography variant="body1">{item.groupName}</Typography>
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (_, item) => <Typography variant="body1">{item.description}</Typography>
		},
		{
			title: 'Inactive',
			dataIndex: 'inactive',
			key: 'inactive',
			render: (_, item) => <Checkbox checked={item.inactive} />
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="groupID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
