/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, Popover, Avatar, Menu } from 'antd';
import React, { useContext } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import * as actions from '../../../_redux/_projectActions';
import { ProjectContext } from '../../ProjectContext';
import { badgeStatus, typeColor, priorityColor } from './ConfigTableProject';

function TableProject(props) {
	const dispatch = useDispatch();
	const { entitiesDetail } = props;
	const projectContext = useContext(ProjectContext);
	const { setVisible, visible, setFormProject } = projectContext;
	const handleOpenVisible = item => {
		setVisible(true);
		dispatch(actions.getTaskViewDetail(item.taskID));
	};
	const handleEditForm = (item, type) => {
		setFormProject({
			open: true,
			title: type
		});
		dispatch(actions.setTaskEditProject(item));
	};
	const updatedStatus = (item, status) => {
		dispatch(actions.updatedTaskStatus(item, status)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Success', 'Updated status success');
			}
		});
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '2%',
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '8', display: visible && 'none' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem onClick={() => handleOpenVisible(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon> visibility </Icon>
									</ListItemIcon>
									<ListItemText primary="Open details view" />
								</MenuItem>
								<MenuItem onClick={() => handleEditForm(item, 'Setting task')} role="button">
									<ListItemIcon className="min-w-40">
										<Icon> settings </Icon>
									</ListItemIcon>
									<ListItemText primary="Task settings" />
								</MenuItem>
								{item.isModified && (
									<>
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
										</MenuItem>{' '}
									</>
								)}
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
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: '20%',
			render: (_, item) => (
				<Typography style={{ marginLeft: '20px', cursor: 'default' }} component="button">
					{' '}
					{item.taskName}{' '}
				</Typography>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '7%',
			render: (_, item) => (
				<p style={{ color: typeColor[item.typeName], textTransform: 'uppercase', fontWeight: 'bold' }}>
					{' '}
					{item.typeName}{' '}
				</p>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '8%',
			render: (_, item) => (
				<Dropdown
					disabled={!item.isUpdated}
					overlay={
						<Menu>
							<Menu.Item onClick={() => updatedStatus(item, 1)} style={{ color: '#1890ff' }}>
								New
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 2)} style={{ color: '#560bad' }}>
								To be scheduled
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 3)} style={{ color: '#e85d04' }}>
								Scheduled
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 4)} style={{ color: '#faad14' }}>
								In progress
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 5)} style={{ color: '#d9d9d9' }}>
								Closed
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 6)} style={{ color: '#52c41a' }}>
								On hold
							</Menu.Item>
							<Menu.Item onClick={() => updatedStatus(item, 7)} style={{ color: '#ff4d4f' }}>
								Rejected
							</Menu.Item>
						</Menu>
					}
					placement="bottomLeft"
					arrow
				>
					<Badge
						size="default"
						style={{ color: badgeStatus[item.statusID], cursor: 'pointer' }}
						color={badgeStatus[item.statusID]}
						text={item.statusName}
					/>
				</Dropdown>
			)
		},
		{
			title: 'Assigne',
			dataIndex: 'assignee',
			key: 'assignee',
			width: '10%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar size={25} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
					<p className="ml-8">{item.ownerName}</p>{' '}
				</div>
			)
		},
		{
			title: 'Priority',
			dataIndex: 'priority',
			key: 'priority',
			width: '5%',
			render: (_, item) => (
				<Badge
					size="default"
					style={{ color: priorityColor[item.priority] }}
					color={priorityColor[item.priority]}
					text={item.priorityName}
				/>
			)
		}
	];
	return (
		<>
			{' '}
			<Table
				rowKey="taskID"
				childrenColumnName="lstTaskItem"
				className="virtual-table"
				expandable={{
					expandRowByClick: true,
					expandIconAsCell: false,
					expandIconColumnIndex: 1,
					expandIcon: ({ expanded, onExpand, record, expandable }) =>
						expandable.length === 0 ? null : expanded ? (
							<CaretDownOutlined style={{ marginRight: '8px !important', fontSize: '10pt' }} />
						) : (
							<CaretUpOutlined style={{ marginRight: '8px !important', fontSize: '10pt' }} />
						)
				}}
				scroll={{ x: 1070, y: 440 }}
				pagination={false}
				columns={columns}
				dataSource={entitiesDetail.listTask}
			/>{' '}
		</>
	);
}

export default withRouter(TableProject);
