/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Avatar } from 'antd';
import React, { useContext } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Link } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import * as actions from '../../../_redux/_projectActions';

const data = [
	{
		key: 1,
		type: 'Task',
		subject: 'Organize open source...',
		grade: '',
		component: '',
		status: <Badge size="lg" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
		priority: <Badge size="default" color="#1890ff" status="success" style={{ color: '#1890ff' }} text="Normarl" />,
		createdOn: '31/05/2021',
		startDate: '31/05/2021',
		finishDate: '31/05/2021',
		assignee: '31/05/2021',
		children: [
			{
				key: 2,
				type: 'Task',
				subject: 'Organize open source...',
				grade: '',
				component: '',
				status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
				priority: <Badge color="#1890ff" status="success" style={{ color: '#1890ff' }} text="Normarl" />,
				createdOn: '31/05/2021',
				startDate: '31/05/2021',
				finishDate: '31/05/2021',
				assignee: '31/05/2021',
				children: []
			}
		]
	},
	{
		key: 3,
		type: 'Task',
		subject: 'Organize open source...',
		grade: '',
		component: '',
		status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
		priority: <Badge color="#1890ff" status="success" style={{ color: '#1890ff' }} text="Normarl" />,
		createdOn: '31/05/2021',
		startDate: '31/05/2021',
		finishDate: '31/05/2021',
		assignee: '31/05/2021',
		children: []
	}
];
function TableProject(props) {
	const dispatch = useDispatch();
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '14%',
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '19' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon> visibility </Icon>
									</ListItemIcon>
									<ListItemText primary="Open details view" />
								</MenuItem>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon>redo</Icon>
									</ListItemIcon>
									<ListItemText primary="Change project" />
								</MenuItem>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon>file_copy</Icon>
									</ListItemIcon>
									<ListItemText primary="Copy" />
								</MenuItem>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon>delete</Icon>
									</ListItemIcon>
									<ListItemText primary="Delete" />
								</MenuItem>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon>event_note</Icon>
									</ListItemIcon>
									<ListItemText primary="Create new child" />
								</MenuItem>
							</>
						)}
						title="Action"
					>
						<MoreVertIcon className="cursor-pointer" />
					</Popover>
				</>
			)
		},
		{
			title: 'SUBJECT',
			dataIndex: 'subject',
			key: 'subject',
			width: '30%',
			render: (_, item) => (
				<Link style={{ marginLeft: '10px', textDecoration: 'none' }} component="button">
					{' '}
					{item.subject}{' '}
				</Link>
			)
		},
		{
			title: 'TYPE',
			dataIndex: 'type',
			key: 'type',
			width: '10%',
			render: (_, item) => (
				<p style={{ color: '#108ee9', textTransform: 'uppercase', fontWeight: 'bold' }}> {item.type} </p>
			)
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			key: 'status',
			width: '10%'
		},
		{
			title: 'ASSIGNEE',
			dataIndex: 'assignee',
			key: 'assignee',
			width: '10%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar size={25} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
					<p className="ml-8"> Duc Phung</p>{' '}
				</div>
			)
		},
		{
			title: 'PRIORITY',
			dataIndex: 'priority',
			key: 'priority',
			width: '10%'
		}
	];
	return (
		<>
			{' '}
			<Table
				rowKey="key"
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
				scroll={{ x: 1540, y: 440 }}
				pagination={false}
				columns={columns}
				dataSource={data}
			/>{' '}
		</>
	);
}

export default withRouter(TableProject);
