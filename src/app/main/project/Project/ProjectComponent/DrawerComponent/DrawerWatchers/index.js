import React from 'react';
import { Avatar, Table } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';

export default function DrawerWatchers() {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const columns = [
		{
			title: '',
			dataIndex: 'userName',
			key: 'userName',
			width: '1%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar
						style={{
							backgroundColor: '#87d068',
							verticalAlign: 'middle',
							marginTop: 5
						}}
						size="large"
					>
						<p className="uppercase"> {sliceString(item.userName)}</p>
					</Avatar>{' '}
				</div>
			)
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName',
			width: '2%'
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: '2%'
		},
		{
			title: 'Date view',
			dataIndex: 'timeUpdate',
			key: 'timeUpdate',
			width: '2%'
		}
	];
	return (
		<div>
			<div className="flex flex-col ml-8">
				<div className="text-sm font-medium text-black head-example "> View </div>
				<div className="w-full flex-none text-sm font-normal text-gray-500">
					List of users viewing my tasks{' '}
				</div>
			</div>
			<div className="mt-16">
				<Table
					rowKey="rowNum"
					className="virtual-table"
					scroll={{ y: 440 }}
					pagination={false}
					columns={columns}
					dataSource={entitiesView && entitiesView.watcher}
				/>
			</div>
		</div>
	);
}
