/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, Popover, Avatar, Menu, Tooltip, Progress, Spin, Checkbox } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography, Link } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { checkDeadline, durationDay, notificationConfig } from '@fuse/core/DtpConfig';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import * as moment from 'moment';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../_redux/_projectActions';
import { ProjectContext } from '../../ProjectContext';
import { typeColor, priorityColor, badgeText } from './ConfigTableProject';

function TableProject(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const { entitiesDetail, actionLoading, params, listLoading, sectorArr, owner } = props;
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [onClickRow, setOnClickRow] = useState(null);
	const projectContext = useContext(ProjectContext);
	useEffect(() => {
		const newEntis = entitiesDetail?.listTask?.map(item => item.taskID);
		if (newEntis && newEntis.length > 0) {
			setSelectedRowKeys(newEntis);
		}
	}, [entitiesDetail?.listTask]);
	const onSelectedRowKeysChange = selectedRowKey => {
		setSelectedRowKeys(selectedRowKey);
	};
	const {
		setVisible,
		visible,
		setFormProject,
		formProject,
		rowPage,
		page,
		ownerFilter,
		setOwnerFilter,
		status,
		setStatus,
		dateStart,
		sector,
		setSector,
		search
	} = projectContext;
	const handleOpenVisible = item => {
		setVisible(true);
		setOnClickRow(item.taskID);
		dispatch(actions.getTaskViewDetail(item.taskID));
	};
	const setRowClassName = record => {
		return record.taskID === onClickRow ? 'clickRowStyl' : '';
	};
	const handleEditForm = (item, type) => {
		if (type === 'settingtask') {
			history.push(`/projects/modify-task/settingtask/${params.detail}/modify`);
		} else {
			history.push(`/projects/modify-task/newtask/${params.detail}/modify`);
		}
		dispatch(actions.setTaskEditProject(item));
	};
	const updatedStatus = (item, statusTask) => {
		if (statusTask === 5) {
			dispatch(actions.updatedTaskStatus(item, statusTask, 100)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.updateStatusTask
					);
					let str = '';
					if (item.statusID !== statusTask) {
						str = `${str} *TRẠNG THÁI được thay đổi từ ${item.statusName} đến ${badgeText[statusTask]}`;
					}
					if (item.percentage !== 100) {
						str = `${str} *TIẾN ĐỘ (%) được thay đổi từ ${item.percentage} đến 100.`;
					}
					if (str !== '') dispatch(actions.addTaskActivity(item.taskID, str, 'type'));
					dispatch(
						actions.fetchProjectDetailFilter(
							params.detail,
							rowPage,
							page,
							ownerFilter,
							status,
							dateStart,
							sector,
							search
						)
					);
					dispatch(actions.getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				}
			});
		} else {
			dispatch(actions.updatedTaskStatus(item, statusTask)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.updateStatusTask
					);
					if (item.statusID !== statusTask) {
						const comment = `*TRẠNG THÁI được thay đổi từ ${item.statusName} đến ${badgeText[statusTask]}`;
						dispatch(actions.addTaskActivity(item.taskID, comment, 'type'));
					}
					dispatch(
						actions.fetchProjectDetailFilter(
							params.detail,
							rowPage,
							page,
							ownerFilter,
							status,
							dateStart,
							sector,
							search
						)
					);
					dispatch(actions.getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				}
			});
		}
	};
	const deleteTask = item => {
		dispatch(actions.deleteTask(item)).then(data => {
			if (data && !data.isError) {
				dispatch(
					actions.fetchProjectDetailFilter(
						params.detail,
						rowPage,
						page,
						ownerFilter,
						status,
						dateStart,
						sector,
						search
					)
				);
				dispatch(actions.getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
			}
		});
	};
	const onHandleChangeOwner = value => {
		dispatch(
			actions.fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				value?.toString(),
				status,
				dateStart,
				sector,
				search
			)
		);
		setOwnerFilter(value);
	};
	const onHandleChangeStatus = value => {
		dispatch(
			actions.fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter,
				value?.toString(),
				dateStart,
				sector,
				search
			)
		);
		setStatus(value);
	};
	const onHandleChangeSector = value => {
		dispatch(
			actions.fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter,
				status,
				dateStart,
				value?.toString(),
				search
			)
		);
		setSector(value);
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			fixed: 'left',
			key: 'operation',
			width: '2%',
			render: (_, item) => (
				<Popover
					overlayStyle={{ zIndex: '8', display: visible || formProject.open ? 'none' : '' }}
					placement="rightTop"
					content={() => (
						<>
							<MenuItem onClick={() => handleOpenVisible(item)} role="button">
								<ListItemIcon className="min-w-40">
									<Icon> visibility </Icon>
								</ListItemIcon>
								<ListItemText primary="Overview" />
							</MenuItem>
							<MenuItem onClick={() => handleEditForm(item, 'settingtask')} role="button">
								<ListItemIcon className="min-w-40">
									<Icon> settings </Icon>
								</ListItemIcon>
								<ListItemText primary="Task settings" />
							</MenuItem>
							{item.isModified && (
								<>
									<MenuItem onClick={() => handleEditForm(item, 'newtask')} role="button">
										<ListItemIcon className="min-w-40">
											<Icon>file_copy</Icon>
										</ListItemIcon>
										<ListItemText primary="Copy" />
									</MenuItem>
									{item.taskTypeID === 2 && item.statusName === 'New' && item.countChild === 0 && (
										<MenuItem onClick={() => deleteTask(item)} role="button">
											<ListItemIcon className="min-w-40">
												<Icon>delete</Icon>
											</ListItemIcon>
											<ListItemText primary="Delete" />
										</MenuItem>
									)}
								</>
							)}
						</>
					)}
					title="Action"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			fixed: 'left',
			width: '20%',
			render: (_, item) => (
				<Link
					className={
						checkDeadline(item.endDate) > 0 &&
						item.statusID !== 5 &&
						item.statusID !== 6 &&
						item.statusID !== 7 &&
						item.typeName === 'TASK'
							? 'table-row-dark'
							: 'table-row-primary'
					}
					variant={
						checkDeadline(item.endDate) > 0 &&
						item.statusID !== 5 &&
						item.statusID !== 6 &&
						item.statusID !== 7 &&
						item.typeName === 'TASK'
							? 'subtitle2'
							: 'body1'
					}
					onClick={() => handleOpenVisible(item)}
					component="button"
				>
					{item.taskName}
				</Link>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Sector
						<Dropdown
							// visible
							overlay={
								<div className="filter--status">
									<Checkbox.Group
										options={sectorArr}
										value={sector}
										onChange={onHandleChangeSector}
									/>
								</div>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'sectorName',
			key: 'sectorName',
			width: '6%',
			render: (_, item) => <Typography variant="body1">{item.sectorName}</Typography>
		},
		{
			title: 'Type',
			align: 'center',
			dataIndex: 'type',
			key: 'type',
			width: '6%',
			render: (_, item) => (
				<Typography variant="subtitle2" style={{ color: typeColor[item.typeName], textTransform: 'uppercase' }}>
					{item.typeName}
				</Typography>
			)
		},
		{
			title: 'Start',
			align: 'center',
			dataIndex: 'startDate',
			key: 'startDate',
			width: '7%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green  rounded-16'
					)}
				>
					<Icon className="text-16">access_time</Icon>
					<Typography className="ml-8" variant="body1">
						{item.startDate && moment(item.startDate).format('DD/MM/YY')}
					</Typography>
				</div>
			)
		},
		{
			title: 'Finish',
			align: 'center',
			dataIndex: 'endDate',
			key: 'endDate',
			width: '7%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green  rounded-16'
					)}
				>
					<Icon className="text-16">access_time</Icon>
					<Typography className="ml-8" variant="body1">
						{item.endDate && moment(item.endDate).format('DD/MM/YY')}
					</Typography>
				</div>
			)
		},
		{
			title: 'Duration',
			align: 'center',
			dataIndex: 'duration',
			key: 'duration',
			width: '8%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 rounded-16 ',
						'text-blue'
					)}
				>
					<Icon className="text-16">check_circle</Icon>
					<Typography className="ml-8" variant="subtitle1" component="button">
						{durationDay(item.startDate, item.endDate)} Days
					</Typography>{' '}
				</div>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Status
						<Dropdown
							// visible
							overlay={
								<div className="filter--status">
									<Checkbox.Group
										options={props.ArrProjectStatus}
										value={status}
										onChange={onHandleChangeStatus}
									/>
								</div>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'status',
			key: 'status',
			width: '10%',
			render: (_, item) =>
				item.typeName !== 'MILESTONE' && (
					<Dropdown
						disabled={!item.isUpdated || actionLoading}
						overlay={
							<Menu>
								{props.ArrProjectStatus?.map(itemStatus => (
									<Menu.Item
										key={itemStatus.value}
										onClick={() => updatedStatus(item, itemStatus.value)}
										style={{ color: itemStatus.colorCode }}
									>
										<Typography variant="body1">{itemStatus.label}</Typography>
									</Menu.Item>
								))}
							</Menu>
						}
						placement="bottomLeft"
						arrow
					>
						<div className="flex flex-row justify-between items-center">
							<Badge
								size="default"
								style={{ color: item.colorCode, cursor: 'pointer' }}
								color={item.colorCode}
								text={item.statusName}
							/>
							<CaretDownOutlined style={{ cursor: 'pointer', marginLeft: '10px' }} />
						</div>
					</Dropdown>
				)
		},
		{
			title: 'Progress',
			align: 'center',
			dataIndex: 'status',
			key: 'status',
			width: '10%',
			render: (_, item) => <Progress percent={item.percentage} strokeColor={typeColor[item.typeName]} />
		},
		{
			title: 'Priority',
			align: 'center',
			dataIndex: 'priority',
			key: 'priority',
			width: '6%',
			render: (_, item) => (
				<Typography variant="body1" style={{ color: priorityColor[item.priority] }}>
					{item.priorityName}
				</Typography>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Assign
						<Dropdown
							overlay={
								<div className="filter--owner">
									<Checkbox.Group
										options={owner}
										value={ownerFilter}
										onChange={onHandleChangeOwner}
									/>
								</div>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'assignee',
			key: 'assignee',
			width: '12%',
			render: (_, item) => (
				<div className="flex flex-row items-center">
					<Avatar size={32} style={{ backgroundColor: item.colorCode }} icon={<UserOutlined />} />
					<Typography className="ml-8" variant="body1">
						{item.ownerName}
					</Typography>
				</div>
			)
		},
		{
			title: 'Members',
			dataIndex: 'member',
			key: 'assignee',
			width: '8%',
			render: (_, item) => (
				<div className="flex flex-row">
					<Avatar.Group maxCount={3} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{item?.lstUserInvited?.map(av => (
							<Tooltip key={av.userID} title={av.fullName} placement="top">
								<Avatar size={32} style={{ backgroundColor: '#87d068' }}>
									<Typography color="inherit" variant="subtitle1">
										{av.alphabet}
									</Typography>
								</Avatar>
							</Tooltip>
						))}
					</Avatar.Group>
				</div>
			)
		}
	];
	return (
		<Table
			rowKey="taskID"
			childrenColumnName="lstTaskItem"
			rowClassName={record => setRowClassName(record)}
			expandable={{
				expandRowByClick: false,
				expandIconAsCell: false,
				expandIconColumnIndex: 1,
				fixed: false,
				expandedRowKeys: selectedRowKeys,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? (
						<CaretUpOutlined className="w-40" style={{ color: 'transparent' }} />
					) : expanded ? (
						<CaretUpOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
					) : (
						<CaretDownOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
					),
				onExpandedRowsChange: onSelectedRowKeysChange
			}}
			scroll={{
				x: entitiesDetail?.listTask?.length > 0 ? (matches ? 1900 : 1800) : matchesSM ? 1800 : null,
				y: null
			}}
			pagination={false}
			columns={columns}
			loading={listLoading && <Spin />}
			dataSource={entitiesDetail?.listTask}
		/>
	);
}

export default withRouter(TableProject);
