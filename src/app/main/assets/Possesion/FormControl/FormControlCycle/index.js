/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Tooltip } from 'antd';
import Text from 'app/components/Text';
import { useHistory } from 'react-router';
import FormCustomCycleEdit from './FormCustomCycleEdit';
import * as actions from '../../_redux/possesionActions';

export default function FormControlCycle() {
	const dispatch = useDispatch();
	const history = useHistory();
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
	}, [entitiesEdit, history]);
	const handleSubmitCycle = values => {
		dispatch(actions.assetReuse(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.assets.CycleAssets
				);
				history.goBack();
			}
		});
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Đưa vào sử dụng lại.
				</Text>
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
					<FormCustomCycleEdit
						actionLoading={actionLoading}
						handleSubmitCycle={handleSubmitCycle}
						entitiesEdit={entitiesEdit}
						handleClose={ExitPage}
					/>
				</div>
			</div>
		</div>
	);
}
