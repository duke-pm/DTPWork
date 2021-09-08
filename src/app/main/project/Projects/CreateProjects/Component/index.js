import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { useParams, useHistory } from 'react-router';
import CustomForm from './CustomForm';
import * as actions from '../../../_redux/_projectActions';

export default function FormComponent({ owner, projectSub, role }) {
	let initial = {
		prjID: '0',
		prjName: '',
		prjParentID: null,
		owner: null,
		isPublic: true,
		descr: '',
		statusID: 1,
		userInvite: [],
		priority: 0,
		appraisalTime: null
	};
	const { currentState } = useSelector(
		state => ({
			currentState: state.project
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const history = useHistory();
	const params = useParams();
	const handleCancle = () => history.goBack();
	useEffect(() => {
		if (params.type === 'Settings' && !entitiesEdit) {
			history.goBack();
		} else if (params.type === 'Clone' && !entitiesEdit) {
			history.goBack();
		}
	}, [params.type, history, entitiesEdit]);
	if (entitiesEdit && entitiesEdit.prjID) {
		initial = {
			prjID: entitiesEdit?.prjID,
			prjName: entitiesEdit?.prjName,
			prjParentID: entitiesEdit?.prjParentID === 0 ? null : entitiesEdit.prjParentID,
			owner: entitiesEdit?.owner === 0 ? null : entitiesEdit.owner,
			isPublic: entitiesEdit?.isPublic,
			descr: entitiesEdit?.descr,
			statusID: entitiesEdit?.statusID,
			priority: entitiesEdit?.priorityLevel,
			appraisalTime: entitiesEdit?.appraisalTime,
			userInvite: entitiesEdit?.listUserIDInvited ? entitiesEdit.listUserIDInvited.split(',').map(Number) : []
		};
	}
	const dispatch = useDispatch();
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.prjID) {
			if (params.type === 'Settings') {
				dispatch(actions.updatedProject(values)).then(data => {
					if (data && !data.isError) {
						history.goBack();
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.projects.updatedProject
						);
					}
				});
			} else {
				dispatch(actions.createdProject(values)).then(data => {
					if (data && !data.isError) {
						history.goBack();
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.projects.cloneProject
						);
					}
				});
			}
		} else {
			dispatch(actions.createdProject(values)).then(data => {
				if (data && !data.isError) {
					history.goBack();
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.projects.createdProject
					);
				}
			});
		}
	};
	return (
		<>
			<CustomForm
				handleSubmitForm={handleSubmitForm}
				initial={initial}
				role={role}
				owner={owner}
				projectSub={projectSub}
				actionLoading={actionLoading}
				handleCancle={handleCancle}
			/>
		</>
	);
}
