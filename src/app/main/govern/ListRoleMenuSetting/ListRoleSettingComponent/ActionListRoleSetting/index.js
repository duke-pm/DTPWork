/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import 'antd/dist/antd.css';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Select, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import * as action from '../../_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ActionListRoleSetting({ actionLoading, currentInfo }) {
	const [groupUser, setGroupUser] = useState(null);
	const dispatch = useDispatch();
	const [userID, setUserID] = useState(null);
	const [UserOption, setUserOption] = useState([]);
	const userGroup =
		currentInfo &&
		currentInfo.userGroup.reduce((arr, curr) => [...arr, { label: curr.groupName, value: curr.groupID }], []);
	const Use =
		currentInfo &&
		currentInfo.users.reduce(
			(arr, curr) => [...arr, { label: curr.empName, value: curr.empID, groupID: curr.groupID }],
			[]
		);
	const onHandleChangeGroupID = value => {
		setGroupUser(value);
		setUserID(null);
		const newUser = Use.filter(item => item.groupID === value);
		setUserOption(newUser);
	};
	const onHandleChangeUserID = value => {
		setUserID(value);
	};
	const handleFiler = () => {
		console.log({ groupUser, userID });
		dispatch(action.fetchsListFilterRole(groupUser, userID));
	};
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Typography variant="subtitle1" color="inherit">
						Filter.
					</Typography>
				</div>
				<div className="flex flex-col sm:flex-row">
					<Paper style={{ width: '220px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							allowClear
							loading={!!actionLoading}
							placeholder="Nhóm người dùng"
							onChange={onHandleChangeGroupID}
							bordered={false}
							style={{ width: '100%' }}
						>
							{userGroup &&
								userGroup.map(item => (
									<Select.Option key={item.value} value={item.value}>
										{item.label}
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Paper style={{ width: '220px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							allowClear
							loading={!!actionLoading}
							placeholder="Người dùng"
							onChange={onHandleChangeUserID}
							bordered={false}
							value={userID}
							style={{ width: '100%' }}
						>
							{UserOption &&
								UserOption.map(item => (
									<Select.Option key={item.value} value={item.value}>
										{item.label}
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Button
						onClick={handleFiler}
						variant="contained"
						type="button"
						color="primary"
						className="ml-16 sm:mb-0 mb-9"
					>
						{' '}
						Filter{' '}
					</Button>
				</div>
			</FuseAnimateGroup>
		</div>
	);
}
