/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getToken, notificationConfig, URL } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import Text from 'app/components/Text';
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
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);
	const ExportExcel = assetID => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			AssetID: assetID
		};
		window.location = `${URL}/api/RQAsset/ExportRequestRecovery?value=${JSON.stringify(dataReq)}`;
	};
	const saveWithDraw = values => {
		dispatch(action.withdrawPossesion(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.gobal.vi.updatedSuccess
				);
				history.goBack();
				ExportExcel(data.data.assetID);
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
				<Text color="primary" type="title">
					Thu hồi tài sản.
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
