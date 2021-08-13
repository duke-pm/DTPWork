/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Popover, Avatar, Menu, Tooltip, Progress } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { MenuItem, ListItemIcon, Icon, ListItemText, Typography, Link } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { SettingLineContext } from '../../SettingLineContext';

function TableProject(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	// const { entitiesDetail, actionLoading, params } = props;
	const lineContext = useContext(SettingLineContext);
	// const {} = lineContext;
	const handleEditForm = item => {};
	const deleteTask = item => {};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '2%',
			render: (_, item) => (
				<Popover
					placement="rightTop"
					content={() => (
						<>
							<MenuItem onClick={() => handleEditForm(item, 'Setting task')} role="button">
								<ListItemIcon className="min-w-40">
									<Icon> settings </Icon>
								</ListItemIcon>
								<ListItemText primary="Edit" />
							</MenuItem>
							<MenuItem onClick={() => deleteTask(item)} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>delete</Icon>
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</MenuItem>
						</>
					)}
					title="Action"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Role code',
			align: 'center',
			dataIndex: 'roleCode',
			key: 'roleCode',
			render: (_, item) => <Typography variant="body1">{item.roleCodde}</Typography>
		},
		{
			title: 'Role Name',
			align: 'center',
			dataIndex: 'roleName',
			key: 'roleName',
			render: (_, item) => <Typography variant="body1">{item.roleName}</Typography>
		}
	];
	return <Table rowKey="taskID" className="virtual-table" pagination={false} columns={columns} dataSource={[]} />;
}

export default withRouter(TableProject);
