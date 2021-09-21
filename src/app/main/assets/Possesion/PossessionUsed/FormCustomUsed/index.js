/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Typography, Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router';
import FormCustomUsedEdit from './FormCustomUsedEdit';
import * as action from '../../_redux/possesionActions';

export default function FormCustomUsed() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const ExitPage = () => history.goBack();
	useEffect(() => {
		if (!entitiesEdit) ExitPage();
	}, [entitiesEdit]);
	const saveWithDraw = values => {
		dispatch(action.withdrawPossesion(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.gobal.vi.updatedSuccess
				);
				history.goBack();
			} else {
				notificationConfig(
					'warning',
					notificationContent.content.vi.faild,
					notificationContent.description.gobal.vi.UpdatedFaild
				);
			}
		});
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Thu hồi tài sản.
				</Typography>
				<div className="assets__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="assets__content mt-8">
				<div className="assets__form">
					<FormCustomUsedEdit
						actionLoading={actionLoading}
						saveWithDraw={saveWithDraw}
						entitiesEdit={entitiesEdit}
						handleClose={ExitPage}
					/>
				</div>
			</div>
		</div>
	);
}
