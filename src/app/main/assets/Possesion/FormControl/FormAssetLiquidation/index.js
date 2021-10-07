/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Tooltip } from 'antd';
import Text from 'app/components/Text';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import * as action from '../../_redux/possesionActions';
import FormCustomLiquidation from './FormCustomLiquidation';

export default function FormAssetLiquidation() {
	const history = useHistory();
	const location = useLocation();
	const category = queryString.parse(location.search);
	const ExitPage = () => history.goBack();
	const dispatch = useDispatch();
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
	const saveWithDraw = values => {
		dispatch(action.liquidationAsset(values, entitiesEdit, category.type)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.assets.liquidationAsset
				);
				history.goBack();
			}
		});
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Thanh lý tài sản
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
					<FormCustomLiquidation
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
