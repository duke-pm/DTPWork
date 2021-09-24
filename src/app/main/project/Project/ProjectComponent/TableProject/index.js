/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, Popover, Avatar, Menu, Tooltip, Progress, Checkbox } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Link } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { checkDeadline, durationDay, notificationConfig, sortDirestion } from '@fuse/core/DtpConfig';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import Text from 'app/components/Text';
import * as actions from '../../../_redux/_projectActions';
import { ProjectContext } from '../../ProjectContext';
import { typeColor, priorityColor, badgeText } from './ConfigTableProject';

function TableProject(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const { entitiesDetail, actionLoading, params, createSortHandler, owner } = props;
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
	const onChangeSort = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const {
		setVisible,
		visible,
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
		search,
		sort
	} = projectContext;
	const handleOpenVisible = item => {
		setVisible(true);
		setOnClickRow(item.taskID);
		// dispatch(actions.getTaskViewDetail(item.taskID));
		history.push(`/projects/overview-task/${item.taskID}`);
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
							ownerFilter.toString(),
							status.toString(),
							dateStart,
							sector.toString(),
							sort.id,
							sort.direction,
							search
						)
					);
					dispatch(
						actions.getTaskDetailAll(
							params.detail,
							ownerFilter.toString(),
							status.toString(),
							sector.toString(),
							search
						)
					);
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
							ownerFilter?.toString(),
							status?.toString(),
							dateStart,
							sector?.toString(),
							sort.id,
							sort.direction,
							search
						)
					);
					dispatch(
						actions.getTaskDetailAll(
							params.detail,
							ownerFilter?.toString(),
							status?.toString(),
							sector?.toString(),
							search
						)
					);
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
						ownerFilter.toString(),
						status.toString(),
						dateStart,
						sector.toString(),
						sort.id,
						sort.direction,
						search
					)
				);
				dispatch(
					actions.getTaskDetailAll(
						params.detail,
						ownerFilter.toString(),
						status.toString(),
						sector.toString(),
						search
					)
				);
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
				status?.toString(),
				dateStart,
				sector?.toString(),
				sort.id,
				sort.direction,
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
				ownerFilter?.toString(),
				value?.toString(),
				dateStart,
				sector?.toString(),
				sort.id,
				sort.direction,
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
				ownerFilter?.toString(),
				status?.toString(),
				dateStart,
				value?.toString(),
				sort.id,
				sort.direction,
				search
			)
		);
		setSector(value);
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			fixed: !matchesSM && 'left',
			key: 'operation',
			width: '3%',
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
			sorter: true,
			fixed: !matchesSM && 'left',
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
					<Text>{item.taskName}</Text>
				</Link>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '6%',
			render: (_, item) => (
				<Text type="subTitle" style={{ color: typeColor[item.typeName], textTransform: 'uppercase' }}>
					{item.typeName}
				</Text>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						<Text type="subTitle">Status</Text>
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
										<Text>{itemStatus.label}</Text>
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
			title: 'Priority',
			dataIndex: 'priority',
			key: 'priority',
			width: '6%',
			render: (_, item) => <Text style={{ color: priorityColor[item.priority] }}>{item.priorityName}</Text>
		},
		{
			title: 'Start',
			align: 'center',
			dataIndex: 'StartDate',
			key: 'startDate',
			sorter: true,
			width: '8%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 bg-green-50 rounded-16">
					<Text>{item.startDate && moment(item.startDate).format('DD/MM/YY')}</Text>
				</div>
			)
		},
		{
			title: 'Finish',
			align: 'center',
			dataIndex: 'EndDate',
			key: 'endDate',
			sorter: true,
			width: '8%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 bg-green-50 rounded-16">
					<Text>{item.endDate && moment(item.endDate).format('DD/MM/YY')}</Text>
				</div>
			)
		},
		{
			title: 'Duration',
			align: 'center',
			dataIndex: 'duration',
			key: 'duration',
			width: '6%',
			render: (_, item) => (
				<div className="flex items-center justify-center text-center px-8 py-4 mx-4 rounded-16 text-blue">
					<Text>{durationDay(item.startDate, item.endDate)} Days</Text>
				</div>
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
					<Avatar style={{ backgroundColor: item.colorCode }} icon={<UserOutlined />} />
					<Text className="ml-8">{item.ownerName}</Text>
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
								<Avatar size="default">{av.alphabet}</Avatar>
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
			showSorterTooltip={false}
			pagination={false}
			columns={columns}
			onChange={onChangeSort}
			dataSource={entitiesDetail?.listTask}
		/>
	);
}

export default withRouter(TableProject);
