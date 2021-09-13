import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Button, Typography } from '@material-ui/core';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actionsInfor from '../../assets/Possesion/_redux/possesionActions';
import ListRoleSettingContent from './ListRoleSettingComponent';
import * as actions from './_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ListRoleSettingPage() {
	const dispatch = useDispatch();
	const [userID, setUserID] = useState(null);
	const [UserOption, setUserOption] = useState([]);
	const [groupUser, setGroupUser] = useState(0);
	const [newData, setNewData] = useState([]);
	const { currentState, currentInfo } = useSelector(
		state => ({
			currentState: state.govern.listRole,
			currentInfo: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const params = 'UserGroups,Users';
	useEffect(() => {
		dispatch(actionsInfor.getInformationCompany(params));
		dispatch(actions.fetchsListRoleSettings());
	}, [dispatch]);
	const handleUpdatedRole = () => {
		if (groupUser) {
			dispatch(actions.updatedRoleUser(newData, userID, groupUser)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.gobal.vi.updatedSuccess
					);
				} else {
					dispatch(actions.fetchsListFilterRole(groupUser, userID));
				}
			});
		} else {
			notificationConfig('warning', 'Thất bại', 'Vui lòng chọn nhóm người dùng để cấp quyền');
		}
	};
	const { actionLoading } = currentState;
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
		dispatch(actions.fetchsListFilterRole(groupUser, userID));
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Phân quyền chức năng
				</Typography>
				<div className="govern__header--action">
					<Select
						allowClear
						loading={!!actionLoading}
						placeholder="Nhóm người dùng"
						onChange={onHandleChangeGroupID}
						bordered={false}
						style={{ width: '100%', marginRight: '15px' }}
					>
						{userGroup &&
							userGroup.map(item => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
					</Select>
					<Select
						allowClear
						loading={!!actionLoading}
						placeholder="Người dùng"
						onChange={onHandleChangeUserID}
						bordered={false}
						value={userID}
						style={{ width: '100%', marginRight: '15px' }}
					>
						{UserOption &&
							UserOption.map(item => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
					</Select>
					<Button onClick={handleFiler} className="button__create mr-16" variant="contained" color="primary">
						<Typography variant="body2">Filter</Typography>
					</Button>
					<Button onClick={handleUpdatedRole} className="button__create" variant="contained" color="primary">
						<Typography variant="body2">Update</Typography>
					</Button>{' '}
				</div>
			</div>
			<div className="govern__content mt-8">
				<div className="govern__content--table px-16">
					<ListRoleSettingContent newData={newData} setNewData={setNewData} />
				</div>
			</div>
		</div>
	);
}
