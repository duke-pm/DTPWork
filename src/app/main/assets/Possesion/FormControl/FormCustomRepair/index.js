/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Typography, Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Tooltip } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import FormCustomRepairEdit from './FormCustomRepairEdit';
import * as actions from '../../_redux/possesionActions';

export default function FormCustomService() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const category = queryString.parse(location.search);
	const ExitPage = () => history.goBack();
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	useEffect(() => {
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit]);
	const handleSubmitRepairService = values => {
		dispatch(actions.repairPossesion(values, entitiesEdit, category.type)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.assets.repairAssetsSuccess
				);
				history.goBack();
			}
		});
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Sửa chữa bảo hành tài sản.
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
					<FormCustomRepairEdit
						handleClose={ExitPage}
						actionLoading={actionLoading}
						handleSubmitRepairService={handleSubmitRepairService}
						entitiesEdit={entitiesEdit}
					/>
				</div>
			</div>
		</div>
	);
}
