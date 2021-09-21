/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Table, Checkbox, Spin } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { sortDirestion } from '@fuse/core/DtpConfig';
import Text from 'app/components/Text';
import ActionsGroupUserBody from '../ActionGroupUser/ActionsGroupUserBody';

export default function TableGroupUser({ entities, listLoading, handleEditGroupUser, createSortHandler }) {
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const columns = [
		{
			title: 'Mã nhóm',
			dataIndex: 'groupID',
			key: 'groupID',
			sorter: true,
			render: (_, item) => <Text>{item.groupID}</Text>
		},
		{
			title: 'Tên nhóm',
			dataIndex: 'groupName',
			key: 'groupName',
			sorter: true,
			render: (_, item) => <Text>{item.groupName}</Text>
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			sorter: true,
			render: (_, item) => <Text>{item.description}</Text>
		},
		{
			title: 'Inactive',
			dataIndex: 'inactive',
			key: 'inactive',
			render: (_, item) => <Checkbox checked={item.inactive} />
		},
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'center',
			width: '4%',
			render: (_, item) => <ActionsGroupUserBody items={item} handleEditGroupUser={handleEditGroupUser} />
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
