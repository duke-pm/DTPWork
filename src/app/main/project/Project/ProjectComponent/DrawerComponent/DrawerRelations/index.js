/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from '@material-ui/core';
import { Table, Badge } from 'antd';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function DrawerRelations() {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const columns = [
		{
			title: 'Id',
			dataIndex: 'taskID',
			key: 'taskID',
			width: '2%'
		},
		{
			title: 'Subject',
			dataIndex: 'taskName',
			key: 'taskName',
			width: '9%',
			render: (_, item) => (
				<Link style={{ marginLeft: '10px', textDecoration: 'none' }} component="button">
					{' '}
					{item.taskName}{' '}
				</Link>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '5%',
			render: (_, item) => (
				<p style={{ color: item.typeColor, textTransform: 'uppercase', fontWeight: 'bold' }}>
					{' '}
					{item.typeName}{' '}
				</p>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'statusName',
			width: '5%',
			render: (_, item) => (
				<Badge
					size="default"
					style={{ color: item.colorCode, cursor: 'pointer' }}
					color={item.colorCode}
					text={item.statusName}
				/>
			)
		}
	];
	return (
		<Table
			rowKey="taskID"
			title={() => 'Children'}
			className="virtual-table"
			scroll={{ y: 440 }}
			pagination={false}
			columns={columns}
			dataSource={entitiesView && entitiesView.relationShip}
		/>
	);
}
