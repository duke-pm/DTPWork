/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Avatar, Tooltip, Spin, Dropdown } from 'antd';
import React, { useContext } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography, Link } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import AppsIcon from '@material-ui/icons/Apps';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import { getToken, URL } from '@fuse/core/DtpConfig';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

function TableProject(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	const history = useHistory();
	const { entities, entitiesEdit, listLoading, ArrProjectStatus, owner } = props;
	const projectContext = useContext(ProjectContext);
	const {
		// setFormProject,
		// setTitle,
		rowPage,
		page,
		status,
		ownerFilter,
		dateStart,
		search,
		// setChart,
		setStatus,
		setOwnerFilter
	} = projectContext;
	const handleOpenFormProject = (item, type) => {
		dispatch(actions.setTaskEditProject(item));
		if (type === 'Settings') {
			history.push('/projects/modify/Settings');
		} else {
			history.push('/projects/modify/Clone');
		}
	};
	const setRowClassName = record => {
		return record.prjID === entitiesEdit?.prjID ? 'clickRowStyl' : '';
	};
	const handleDelteProject = item => {
		dispatch(actions.deleteProject(item.prjID)).then(data => {
			if (data && !data.isError) {
				dispatch(
					actions.fetchsProjectFilter(
						rowPage,
						page,
						status?.toString(),
						ownerFilter?.toString(),
						dateStart,
						search
					)
				);
			}
		});
	};
	const handleDetail = item => {
		if (item.countChild === 0) {
			dispatch(actions.setTaskEditProject(item));
			props.history.push(`/projects/task/${item.prjID}`);
		}
	};
	// const handleOpenBarChar = item => {
	// 	props.history.push(`/projects/chart/${item.prjID}`);
	// 	dispatch(actions.setTaskEditProject(item));
	// };
	const onHandleChangeStatus = value => {
		dispatch(
			actions.fetchsProjectFilter(rowPage, page, value?.toString(), ownerFilter?.toString(), dateStart, search)
		);
		setStatus(value);
	};
	const onHandleChangeOwner = value => {
		dispatch(actions.fetchsProjectFilter(rowPage, page, status?.toString(), value?.toString(), dateStart, search));
		setOwnerFilter(value);
	};
	const handleExportExecl = item => {
		const token = getToken();
		const data = {
			UserToken: token,
			PrjID: item.prjID
		};
		window.location = `${URL}/api/Project/ExportProjectDetail?value=${JSON.stringify(data)}`;
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => (
				<Popover
					overlayStyle={{ zIndex: '19' }}
					placement="rightTop"
					content={() => (
						<>
							<MenuItem onClick={() => handleOpenFormProject(item, 'Settings')} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>settings</Icon>
								</ListItemIcon>
								<ListItemText primary="Project settings" />
							</MenuItem>
							<MenuItem onClick={() => handleOpenFormProject(item, 'Clone')} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>file_copy_icon</Icon>
								</ListItemIcon>
								<ListItemText primary="Clone" />
							</MenuItem>
							{item.countChild === 0 && (
								<>
									<MenuItem onClick={() => handleDetail(item)} role="button">
										<ListItemIcon className="min-w-40">
											<Icon>visibility</Icon>
										</ListItemIcon>
										<ListItemText primary="Open detail" />
									</MenuItem>
									{item.countTask > 0 && (
										<MenuItem onClick={() => handleExportExecl(item)} role="button">
											<ListItemIcon className="min-w-40">
												<Icon>get_app</Icon>
											</ListItemIcon>
											<ListItemText primary="Export excel" />
										</MenuItem>
									)}
								</>
							)}
							{item.countChild === 0 && item.isModified && (
								<MenuItem onClick={() => handleDelteProject(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>delete</Icon>
									</ListItemIcon>
									<ListItemText primary="Delete project" />
								</MenuItem>
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
			title: 'Project Name',
			dataIndex: 'prjName',
			fixed: 'left',
			key: 'prjName',
			width: '40%',
			render: (_, item) => (
				<Link
					style={{ color: '#000000d9' }}
					component="button"
					variant="body1"
					onClick={() => handleDetail(item)}
				>
					{' '}
					{item.prjName}{' '}
				</Link>
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
										options={ArrProjectStatus}
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
			width: '15%',
			render: (_, item) => (
				<Badge size="default" style={{ color: item.colorCode }} color={item.colorCode} text={item.statusName} />
			)
		},
		{
			title: 'Public',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '8%',
			render: (_, item) =>
				item.isPublic ? (
					<Icon className="text-green text-20">check_circle</Icon>
				) : (
					<Icon className="text-red text-20">remove_circle</Icon>
				)
		},
		{
			title: 'Priority',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '8%',
			render: (_, item) =>
				item.priorityLevel !== 0 && (
					<Badge count={item.priorityLevel} size="small">
						<img className="w-24 h-20" src="assets/icons8-flag-64.png" alt="flag" />
					</Badge>
				)
		},
		{
			title: 'Created on',
			align: 'center',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) => (
				<div
					className={clsx(
						'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green  rounded-16'
					)}
				>
					<Icon className="text-16">access_time</Icon>
					<Typography className="ml-8" variant="body1">
						{item.crtdDate && moment(item.crtdDate).format('DD/MM/YY')}
					</Typography>
				</div>
			)
		},
		{
			title: 'Inspection time',
			align: 'center',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) =>
				item.appraisalTime && (
					<div
						className={clsx(
							'flex items-center justify-center text-center px-8 py-4 mx-4 text-white bg-green  rounded-16'
						)}
					>
						<Icon className="text-16">access_time</Icon>
						<Typography className="ml-8" variant="body1">
							{item.appraisalTime && moment(item.appraisalTime).format('DD/MM/YY')}
						</Typography>
					</div>
				)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Project Owner
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
			width: '18%',
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
			width: '12%',
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
			rowKey="prjID"
			rowClassName={record => setRowClassName(record)}
			expandable={{
				expandRowByClick: false,
				expandIconAsCell: false,
				expandIconColumnIndex: 1,
				fixed: false,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? (
						<CaretUpOutlined className="w-40" style={{ color: 'white' }} />
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
					)
			}}
			childrenColumnName="lstProjectItem"
			pagination={false}
			scroll={{ x: entities && entities.length ? (matches ? 1520 : 1540) : matchesSM ? 1540 : null }}
			columns={columns}
			dataSource={entities}
			loading={listLoading && <Spin />}
		/>
	);
}

export default withRouter(TableProject);
