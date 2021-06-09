/* eslint-disable jsx-a11y/anchor-is-valid */
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from '@material-ui/core';
import { Table, Badge } from 'antd';
import React from 'react';

const data = [
	{
		key: 1,
		id: 1,
		type: 'Task',
		status: <Badge size="lg" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
		subject: 'Organize open source...',
		children: []
	}
];
export default function DrawerRelations() {
	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
			width: '2%'
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: '9%',
			render: (_, item) => (
				<Link style={{ marginLeft: '10px', textDecoration: 'none' }} component="button">
					{' '}
					{item.subject}{' '}
				</Link>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '5%',
			render: (_, item) => (
				<p style={{ color: '#108ee9', textTransform: 'uppercase', fontWeight: 'bold' }}> {item.type} </p>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '5%'
		}
	];
	return (
		<Table
			rowKey="key"
			title={() => 'Children'}
			className="virtual-table"
			expandable={{
				expandRowByClick: true,
				expandIconAsCell: false,
				expandIconColumnIndex: 1,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? null : expanded ? (
						<DownOutlined style={{ marginRight: '8px !important', fontSize: '8pt' }} />
					) : (
						<UpOutlined
							onClick={e => onExpand(record, e)}
							style={{ marginRight: '8px !important', fontSize: '8pt' }}
						/>
					)
			}}
			scroll={{ y: 440 }}
			pagination={false}
			columns={columns}
			dataSource={data}
		/>
	);
}
