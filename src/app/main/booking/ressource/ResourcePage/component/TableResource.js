/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { sliceString, sortDirestion } from '@fuse/core/DtpConfig';
import { Icon, Typography } from '@material-ui/core';
import { Avatar, Dropdown, Menu, Table, Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Text from 'app/components/Text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteResource, setTaskEditResource } from '../../_reduxResourceBooking/resourceBookingActions';

export default function TableResource({ entities, listLoading, createSortHandler }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const handChangeRouteView = item => {
		dispatch(setTaskEditResource(item));
		history.push(`/booking/resource/view/${item.resourceID}`);
	};
	const handleEdit = item => {
		dispatch(setTaskEditResource(item));
		history.push('/booking/resource/modify-resource/updated');
	};
	const handleDelete = item => {
		dispatch(deleteResource(item.groupID));
	};
	const columns = [
		{
			title: 'Code',
			dataIndex: 'resourceID',
			key: 'resourceID',
			align: 'left',
			sorter: true,
			render: (_, item) => <Text type="body">{item.resourceID}</Text>
		},
		{
			title: 'Name',
			dataIndex: 'resourceName',
			key: 'resourceName',
			align: 'left',
			sorter: true,
			render: (_, item) => (
				<div onClick={() => handChangeRouteView(item)} className="flex items-center cursor-pointer">
					<div className="resource__radio--button" style={{ backgroundColor: item.color }} />
					<Typography variant="name" className="ml-8">
						{item.resourceName}
					</Typography>
				</div>
			)
		},
		{
			title: 'Resource group',
			dataIndex: 'groupName',
			key: 'groupName',
			sorter: true,
			align: 'left',
			render: (_, item) => (
				<Text className="ml-8" type="body">
					{item.groupName}
				</Text>
			)
		},
		{
			title: 'Created by',
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
			title: 'Last modifide',
			dataIndex: 'strCrtdDate',
			key: 'strCrtdDate',
			sorter: true,
			render: (_, item) => <Text type="body">{item.strCrtdDate}</Text>
		},
		{
			title: '',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => (
				<div className="flex justify-end">
					<Tooltip placement="bottom" title="Edit">
						<span onClick={() => handleEdit(item)} className="action--button mr-14">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
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
			rowKey="resourceID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			loading={listLoading}
		/>
	);
}
