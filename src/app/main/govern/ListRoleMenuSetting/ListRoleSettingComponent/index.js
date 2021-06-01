/* eslint-disable no-shadow */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import { useStyles } from '../StyleGroupUser';
import ListRoleSettingBody from './ListRoleSettingBody';
import ActionListRoleSetting from './ActionListRoleSetting';
import * as actions from '../_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ListRoleSettingContent() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [userID, setUserID] = useState(null);
	const [UserOption, setUserOption] = useState([]);
	const [groupUser, setGroupUser] = useState(0);
	const [newData, setNewData] = useState([]);
	// const useListRoleSettingContext = useContext(ListRoleMenuSettingContext);
	const { currentState, currentInfo } = useSelector(
		state => ({
			currentState: state.govern.listRole,
			currentInfo: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const handleUpdatedRole = () => {
		if (groupUser) {
			dispatch(actions.updatedRoleUser(newData, userID, groupUser)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công', 'Cập nhật quyền thành công.');
				} else {
					dispatch(actions.fetchsListFilterRole(groupUser, userID));
				}
			});
		} else {
			notificationConfig('warning', 'Thất bại', 'Vui lòng chọn nhóm người dùng để cấp quyền');
		}
	};
	const { entities, actionLoading, listLoading } = currentState;
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col">
			<ActionListRoleSetting
				handleUpdatedRole={handleUpdatedRole}
				classes={classes}
				groupUser={groupUser}
				userID={userID}
				UserOption={UserOption}
				setUserID={setUserID}
				setUserOption={setUserOption}
				setGroupUser={setGroupUser}
				actionLoading={actionLoading}
				currentInfo={currentInfo}
			/>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<ListRoleSettingBody
								actionLoading={actionLoading}
								newData={newData}
								setNewData={setNewData}
								classes={classes}
								entities={entities}
							/>
						</Paper>
					</TableContainer>
				</div>
			</FuseAnimate>
		</div>
	);
}