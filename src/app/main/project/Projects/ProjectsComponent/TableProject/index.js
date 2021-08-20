/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Avatar, Tooltip } from 'antd';
import React, { useContext, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography, Link } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import AppsIcon from '@material-ui/icons/Apps';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

function TableProject(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	const { entities, entitiesEdit } = props;
	const projectContext = useContext(ProjectContext);
	const { setFormProject, setTitle, rowPage, page, status, ownerFilter, dateStart, search, setChart } =
		projectContext;
	const handleOpenFormProject = (item, type) => {
		setFormProject(true);
		setTitle(type);
		dispatch(actions.setTaskEditProject(item));
	};
	const setRowClassName = record => {
		return record.prjID === entitiesEdit?.prjID ? 'clickRowStyl' : '';
	};
	const handleDelteProject = item => {
		dispatch(actions.deleteProject(item.prjID)).then(data => {
			if (data && !data.isError) {
				dispatch(actions.fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
			}
		});
	};
	const handleDetail = item => {
		if (item.countChild === 0) {
			dispatch(actions.setTaskEditProject(item));
			props.history.push(`/quan-ly-du-an/${item.prjID}`);
		}
	};
	const handleOpenBarChar = item => {
		setChart(true);
		dispatch(actions.getTaskDetailAll(item.prjID));
		dispatch(actions.setTaskEditProject(item));
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
									<MenuItem onClick={() => handleOpenBarChar(item)} role="button">
										<ListItemIcon className="min-w-40">
											<Icon>bar_chart</Icon>
										</ListItemIcon>
										<ListItemText primary="Project plan" />
									</MenuItem>
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
			title: 'Status',
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
			render: (_, item) => <Checkbox checked={item.isPublic} />
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
			render: (_, item) => <Typography variant="body1">{moment(item.crtdDate).format('DD/MM/YYYY')}</Typography>
		},
		{
			title: 'Appraisal time',
			align: 'center',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) => (
				<Typography variant="body1">
					{item.appraisalTime ? moment(item.appraisalTime).format('DD/MM/YYYY') : ''}
				</Typography>
			)
		},
		{
			title: 'Project Owner',
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
		/>
	);
}

export default withRouter(TableProject);
