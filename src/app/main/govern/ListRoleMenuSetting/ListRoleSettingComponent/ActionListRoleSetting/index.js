/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, Grid, Paper } from '@material-ui/core';
import React from 'react';
import 'antd/dist/antd.css';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import Text from 'app/components/Text';
import * as action from '../../_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ActionListRoleSetting({
	actionLoading,
	currentInfo,
	setUserID,
	setUserOption,
	userID,
	UserOption,
	groupUser,
	setGroupUser,
	handleUpdatedRole
}) {
	const dispatch = useDispatch();
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
		dispatch(action.fetchsListFilterRole(groupUser, userID));
	};
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<Text type="subTitle">Filter</Text>
				<Grid className="mb-16" container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper>
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
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper>
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
					</Grid>
					<Grid className="flex flex-row" item xs={12} sm={6} md={4} lg={4}>
						<Button
							onClick={handleFiler}
							variant="contained"
							type="button"
							color="primary"
							className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
							startIcon={<FilterListIcon />}
						>
							Filter
						</Button>
						<Button
							onClick={handleUpdatedRole}
							className="mt-8 sm:mt-0 ml-16 max-w-sm md:max-w-lg h-26"
							variant="contained"
							color="primary"
							startIcon={<UpdateIcon />}
						>
							Cập nhật
						</Button>{' '}
					</Grid>
				</Grid>
			</FuseAnimateGroup>
		</div>
	);
}
