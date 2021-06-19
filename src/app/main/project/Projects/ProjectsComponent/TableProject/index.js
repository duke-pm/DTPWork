/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Avatar } from 'antd';
import React, { useContext } from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import AppsIcon from '@material-ui/icons/Apps';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';
import { badgeStatus, badgeText } from '../ConfigTableProject';

function TableProject(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const dispatch = useDispatch();
	const { entities } = props;
	const projectContext = useContext(ProjectContext);
	const { setFormProject, setTitle, rowPage, page, status, ownerFilter, dateStart, search } = projectContext;
	const handleOpenFormProject = (item, type) => {
		setFormProject(true);
		setTitle(type);
		dispatch(actions.setTaskEditProject(item));
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
			props.history.push(`/quan-ly-du-an/${item.prjID}`);
		}
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '4%',
			render: (_, item) => (
				<>
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
									<MenuItem onClick={() => handleDetail(item)} role="button">
										<ListItemIcon className="min-w-40">
											<Icon>visibility</Icon>
										</ListItemIcon>
										<ListItemText primary="Open detail view" />
									</MenuItem>
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
				</>
			)
		},
		{
			title: 'Project Name',
			dataIndex: 'prjName',
			key: 'prjName',
			width: '27%',
			ellipsis: {
				showTitle: false
			},
			render: (_, item) => (
				<Typography style={{ marginLeft: '20px', cursor: 'default' }} component="button">
					{' '}
					{item.prjName}{' '}
				</Typography>
			)
		},
		// {
		// 	title: 'Sector',
		// 	dataIndex: 'sectorName',
		// 	key: 'sectorName',
		// 	width: '10%'
		// },
		{
			title: 'Description',
			dataIndex: 'descr',
			key: 'descr',
			width: '18%',
			ellipsis: {
				showTitle: false
			},
			render: descr => <p>{descr}</p>
		},
		// {
		// 	title: 'Processing',
		// 	dataIndex: 'status',
		// 	key: 'status',
		// 	width: '15%',
		// 	render: (_, item) => <Progress percent={60} strokeColor={badgeStatus[item.statusID]} status="active" />
		// },
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '12%',
			render: (_, item) => (
				<Badge
					size="default"
					style={{ color: badgeStatus[item.statusID] }}
					color={badgeStatus[item.statusID]}
					text={badgeText[item.statusID]}
				/>
			)
		},
		{
			title: 'Public',
			dataIndex: 'public',
			key: 'public',
			width: '8%',
			render: (_, item) => <Checkbox checked={item.isPublic} />
		},
		{
			title: 'Created on',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) => <p> {moment(item.crtdDate).format('DD/MM/YYYY')} </p>
		},
		{
			title: 'Project Owner',
			dataIndex: 'assignee',
			key: 'assignee',
			width: '18%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar size={25} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
					<p className="ml-8 "> {item.ownerName}</p>{' '}
				</div>
			)
		}
	];

	return (
		<>
			<Table
				rowKey="prjID"
				expandable={{
					expandRowByClick: false,
					expandIconAsCell: false,
					expandIconColumnIndex: 1,
					expandIcon: ({ expanded, onExpand, record, expandable }) =>
						expandable.length === 0 ? null : expanded ? (
							<CaretUpOutlined
								onClick={e => onExpand(record, e)}
								style={{ marginRight: '8px !important', fontSize: '10pt' }}
							/>
						) : (
							<CaretDownOutlined
								onClick={e => onExpand(record, e)}
								style={{ marginRight: '8px !important', fontSize: '10pt' }}
							/>
						)
				}}
				childrenColumnName="lstProjectItem"
				pagination={false}
				scroll={{ x: entities && entities.length ? (matches ? 1520 : 1540) : null }}
				columns={columns}
				dataSource={entities}
			/>{' '}
		</>
	);
}

export default withRouter(TableProject);
