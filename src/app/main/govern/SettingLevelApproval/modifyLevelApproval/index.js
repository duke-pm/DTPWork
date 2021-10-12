/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Grid } from '@material-ui/core';
import Text from 'app/components/Text';
import { Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormComponent from './Component';
import { createdLevel, updatedLevel } from '../reduxSettingLevel/LevelSettingActions';

export default function ModifyLevelApproval() {
	const dispatch = useDispatch();
	const param = 'Users,Roles,TypeGroups,TitleApproval';
	const [isChanged, setIsChange] = useState(false);
	useEffect(() => {
		dispatch(getInformationCompany(param));
	}, [dispatch]);
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.govern.listLevel,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const { entitiesInformation, listloading } = inforCompany;
	const params = useParams();
	const history = useHistory();
	const ExitPage = () => history.goBack();
	useEffect(() => {
		if (params.type === 'cap-nhat' && !entitiesEdit) {
			history.goBack();
		}
	}, [params.type, history, entitiesEdit]);
	const groupUser = entitiesInformation?.typeGroups
		? entitiesInformation.typeGroups.reduce(
				(arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName }],
				[]
		  )
		: [];
	const roles = entitiesInformation?.roles
		? entitiesInformation.roles.reduce((arr, curr) => [...arr, { value: curr.roleID, label: curr.roleName }], [])
		: [];
	const titleApproval = entitiesInformation?.titleApproval
		? entitiesInformation.titleApproval.reduce(
				(arr, curr) => [...arr, { value: curr.titleID, label: curr.titleName }],
				[]
		  )
		: [];
	const users = entitiesInformation?.users
		? entitiesInformation.users.reduce((arr, curr) => [...arr, { value: curr.empID, label: curr.empName }], [])
		: [];
	const handleSubmitApproval = value => {
		if (entitiesEdit?.absID) {
			console.log(isChanged);
			dispatch(updatedLevel(value, isChanged)).then(data => {
				if (data && !data.isError) {
					setIsChange(false);
					history.goBack();
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.lines.updatedMenuSuccess
					);
				}
			});
		} else {
			dispatch(createdLevel(value)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.lines.createdMenuSuccess
					);
					history.goBack();
				}
			});
		}
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16">
				<Text color="primary" type="title">
					{params.type === 'cap-nhat' ? 'Cập nhật level' : 'Thiết lập level'}
				</Text>
				<div className="govern__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="govern__content mt-8">
				<Grid container className="w-full p-16">
					<Grid item lg={3} md={3} sm={false} xs={false} />
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Spin spinning={listloading}>
							<FormComponent
								setIsChange={setIsChange}
								handleSubmitApproval={handleSubmitApproval}
								groupUser={groupUser}
								roles={roles}
								titleApproval={titleApproval}
								users={users}
								ExitPage={ExitPage}
								entitiesEdit={entitiesEdit}
								actionLoading={actionLoading}
							/>
						</Spin>
					</Grid>
					<Grid item lg={3} md={3} sm={false} xs={false} />
				</Grid>
			</div>
		</div>
	);
}
