/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, Paper } from '@material-ui/core';
import React from 'react';
import 'antd/dist/antd.css';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
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
				<div className="flex flex-col sm:flex-row justify-between">
					<h5 className="font-extrabold">Filter</h5>
				</div>
				<div className="flex flex-col sm:flex-row">
					<Paper style={{ width: '220px' }} className="sm:mb-0 mb-9">
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
						startIcon={<FilterListIcon />}
					>
						{' '}
						Filter{' '}
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
				</div>
				<div>
					{/* <div className="flex flex-col sm:flex-row justify-end mt-16">
						<Paper className="w-full sm:w-1/4 flex justify-between ">
							<InputBase
								// onKeyPress={event => {
								// 	if (event.key === 'Enter') {
								// 		handleSearch();
								// 	}
								// }}
								// onChange={e => onHandleChange(e)}
								className={classes.input}
								// value={search}
								placeholder="Tìm kiếm"
								inputProps={{ 'aria-label': 'search google maps' }}
							/>
							<IconButton
								// onClick={handleSearch}
								type="button"
								className={classes.iconButton}
								aria-label="search"
							>
								<SearchIcon />
							</IconButton>
						</Paper>
					</div> */}
				</div>
			</FuseAnimateGroup>
		</div>
	);
}
