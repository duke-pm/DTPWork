/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Checkbox, Table, Popover, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText, Link } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';
import { badgeStatus, badgeText } from '../ConfigTableProject';

function TableProject(props) {
	const dispatch = useDispatch();
	const { entities } = props;
	const projectContext = useContext(ProjectContext);
	const { setFormProject } = projectContext;
	const handleOpenFormProject = item => {
		setFormProject(true);
		dispatch(actions.setTaskEditProject(item));
	};
	const handleClick = () => {
		props.history.push(`/quan-ly-du-an/12`);
	};
	const handleDetail = () => {
		props.history.push(`/quan-ly-du-an/12`);
	};
	const columns = [
		{
			title: <UnorderedListOutlined />,
			align: 'center',
			key: 'operation',
			width: '8%',
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '19' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem onClick={() => handleOpenFormProject(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>edit</Icon>
									</ListItemIcon>
									<ListItemText primary="Edit" />
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
			title: 'Name',
			dataIndex: 'prjName',
			key: 'prjName',
			width: '13%',
			ellipsis: {
				showTitle: false
			},
			render: prjName => (
				<Tooltip placement="topLeft" title={prjName}>
					<Link onClick={handleDetail} component="button">
						{' '}
						{prjName}{' '}
					</Link>
				</Tooltip>
			)
		},
		{
			title: 'Sector',
			dataIndex: 'sectorName',
			key: 'sectorName',
			width: '10%'
		},
		{
			title: 'Description',
			dataIndex: 'descr',
			key: 'descr',
			width: '18%',
			ellipsis: {
				showTitle: false
			},
			render: descr => (
				<Tooltip placement="topLeft" title={descr}>
					{descr}
				</Tooltip>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '12%',
			render: (_, item) => (
				<Badge size="default" status={badgeStatus[item.statusID]} text={badgeText[item.statusID]} />
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
			width: '12%'
		}
	];
	return (
		<>
			{' '}
			<Table
				rowKey="prjID"
				childrenColumnName="lstProjectItem"
				pagination={false}
				scroll={{ x: 1540, y: 540 }}
				columns={columns}
				dataSource={entities}
			/>{' '}
		</>
	);
}

export default withRouter(TableProject);
