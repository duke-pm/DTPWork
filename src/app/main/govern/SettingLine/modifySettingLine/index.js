/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Grid } from '@material-ui/core';
import { Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Text from 'app/components/Text';
import { useHistory, useParams } from 'react-router-dom';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormComponent from './Component';
import { createdLine, updatedLine } from '../reduxSettingLine/LineSettingActions';

export default function ModifySettingLine() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(
		state => ({
			currentState: state.govern.listLines
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const params = useParams();
	const history = useHistory();
	const ExitPage = () => history.goBack();
	useEffect(() => {
		if (params.type === 'cap-nhat' && !entitiesEdit) history.goBack();
	}, [params.type, history, entitiesEdit]);
	const handleSubmitLine = value => {
		if (entitiesEdit?.roleID) {
			dispatch(updatedLine(value)).then(data => {
				if (data && !data.isError) {
					history.goBack();
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.lines.updatedMenuSuccess
					);
				}
			});
		} else {
			dispatch(createdLine(value)).then(data => {
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
					{params.type === 'cap-nhat' ? 'Cập nhật' : 'Tạo mới'}
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
						<FormComponent
							handleSubmitLine={handleSubmitLine}
							entitiesEdit={entitiesEdit}
							actionLoading={actionLoading}
							ExitPage={ExitPage}
						/>
					</Grid>
					<Grid item lg={3} md={3} sm={false} xs={false} />
				</Grid>
			</div>
		</div>
	);
}
