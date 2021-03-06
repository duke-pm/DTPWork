/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Avatar, Tooltip, Dropdown } from 'antd';
import React, { useContext } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Link } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import AppsIcon from '@material-ui/icons/Apps';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import { getToken, sortDirestion, URL } from '@fuse/core/DtpConfig';
import Text from 'app/components/Text';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

function TableProject(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	const history = useHistory();
	const { entities, entitiesEdit, createSortHandler, ArrProjectStatus, owner } = props;
	const projectContext = useContext(ProjectContext);
	const { rowPage, page, status, ownerFilter, dateStart, search, sort, setStatus, setOwnerFilter } = projectContext;
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
						sort.id,
						sort.direction,
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
			actions.fetchsProjectFilter(
				rowPage,
				page,
				value?.toString(),
				ownerFilter?.toString(),
				dateStart,
				sort.id,
				sort.direction,
				search
			)
		);
		setStatus(value);
	};
	const onHandleChangeOwner = value => {
		dispatch(
			actions.fetchsProjectFilter(
				rowPage,
				page,
				status?.toString(),
				value?.toString(),
				dateStart,
				sort.id,
				sort.direction,
				search
			)
		);
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
	const onChangeSort = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: !matchesSM && 'left',
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
			fixed: !matchesSM && 'left',
			key: 'prjName',
			sorter: true,
			width: '30%',
			render: (_, item) => (
				<Link
					style={{ color: '#000000d9' }}
					component="button"
					variant="body1"
					onClick={() => handleDetail(item)}
				>
					<Text>{item.prjName}</Text>
				</Link>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						<Text type="subTitle" color="primary">
							Status
						</Text>
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
			width: '10%',
			render: (_, item) => (
				<Badge size="default" style={{ color: item.colorCode }} color={item.colorCode} text={item.statusName} />
			)
		},
		{
			title: 'Public',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '6%',
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
			dataIndex: 'priorityLevel',
			key: 'priorityLevel',
			sorter: true,
			width: '6%',
			render: (_, item) =>
				item.priorityLevel !== 0 && (
					<Badge count={item.priorityLevel} size="small">
						<img className="w-24 h-20" src="assets/icons8-flag-64.png" alt="flag" />
					</Badge>
				)
		},
		{
			title: 'Start Date',
			align: 'center',
			dataIndex: 'startDate',
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
			title: 'End Date',
			align: 'center',
			dataIndex: 'endDate',
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
			title: 'Inspection time',
			align: 'center',
			dataIndex: 'appraisalTime',
			key: 'appraisalTime',
			sorter: true,
			width: '8%',
			render: (_, item) =>
				item.appraisalTime && (
					<div
						className={clsx(
							'flex items-center justify-center text-center px-8 py-4 bg-green-50 rounded-16'
						)}
					>
						<Text>{item.appraisalTime && moment(item.appraisalTime).format('DD/MM/YY')}</Text>
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
					<Avatar style={{ backgroundColor: item.colorCode }} icon={<UserOutlined />} />
					<Text className="ml-8">{item.ownerName}</Text>
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
								<Avatar>{av.alphabet}</Avatar>
							</Tooltip>
						))}
					</Avatar.Group>
				</div>
			)
		}
	];
	return (
		<Table
			showSorterTooltip={false}
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
			onChange={onChangeSort}
			dataSource={entities}
		/>
	);
}

export default withRouter(TableProject);
