/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@material-ui/core';
import { Avatar, Table, Tooltip } from 'antd';
import Text from 'app/components/Text';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { sliceString, sortDirestion } from '@fuse/core/DtpConfig/index';
import { useDispatch } from 'react-redux';
import {
	deleteResourceGroup,
	setTaskEditResourceGroup
} from '../../_reduxResourceBookingGroup/resourceBookingGroupActions';

export default function TableResourceGroup({ entities, listLoading, createSortHandler }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const handChangeRouteView = item => {
		dispatch(setTaskEditResourceGroup(item));
		history.push('/booking/resource-group/view/6');
	};
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const handleEdit = item => {
		dispatch(setTaskEditResourceGroup(item));
		history.push('/booking/resource-group/modify-resource-group/updates');
	};
	const handleDelete = item => {
		dispatch(deleteResourceGroup(item.groupID));
	};
	const columns = [
		{
			title: 'Mã',
			dataIndex: 'groupID',
			sorter: true,
			key: 'groupID',
			render: (_, item) => <Text type="body">{item.groupID}</Text>
		},
		{
			title: 'Tên nhóm tài nguyên',
			dataIndex: 'groupName',
			align: 'left',
			key: 'groupName',
			sorter: true,
			render: (_, item) => (
				<div onClick={() => handChangeRouteView(item)} className="flex items-center cursor-pointer">
					<div className="">
						{' '}
						<Icon color="primary" fontSize="small">
							{item.icon}
						</Icon>{' '}
					</div>
					<Text type="body" className="ml-8 ">
						{item.groupName}
					</Text>
				</div>
			)
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (_, item) => <Text type="body">{item.descr}</Text>
		},
		{
			title: 'Người tạo',
			dataIndex: 'crtdName',
			key: 'crtdName',
			align: 'left',
			render: (_, item) => (
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{sliceString(item.crtdName)}
					</Avatar>{' '}
					<Text className="ml-8" type="body">
						{item.crtdName}
					</Text>
				</div>
			)
		},
		{
			title: 'Ngày cập nhật',
			dataIndex: 'strCrtdDate',
			sorter: true,
			key: 'strCrtdDate',
			render: (_, item) => <Text type="body">{item.strCrtdDate}</Text>
		},
		{
			title: '',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => (
				<div className="flex justify-end">
					<Tooltip placement="bottom" title="Cập nhật">
						<span onClick={() => handleEdit(item)} className="action--button mr-14">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Xóa">
						<span onClick={() => handleDelete(item)} className="action--button ">
							<Icon fontSize="small">delete</Icon>
						</span>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Table
			showSorterTooltip={false}
			onChange={onChange}
			rowKey="groupID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			loading={listLoading}
		/>
	);
}
