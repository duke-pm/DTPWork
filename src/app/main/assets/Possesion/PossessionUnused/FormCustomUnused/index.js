/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getToken, notificationConfig, URL } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Spin, Tooltip } from 'antd';
import { useHistory } from 'react-router';
import Text from 'app/components/Text';
import FormCustomUnusedEdit from './FormCustomUnusedEdit';
import * as actions from '../../_redux/possesionActions';

export default function FormCustomUnused({ handleClose, open }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const ExitPage = () => history.goBack();
	const params = 'Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail';
	useEffect(() => {
		dispatch(actions.getInformationCompany(params));
	}, [dispatch]);
	const { entitiesEdit, actionLoading, entitiesInformation, listloading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			listloading: state.possesion.listloading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	useEffect(() => {
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);
	const ExportExcel = assetID => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			AssetID: assetID
		};
		window.location = `${URL}/api/RQAsset/ExportAllocation?value=${JSON.stringify(dataReq)}`;
	};
	const saveAddAsset = values => {
		dispatch(actions.addPersonalPossesion(values, entitiesEdit.assetID)).then(data => {
			if (data && !data.isError) {
				notificationConfig(
					'success',
					notificationContent.content.vi.success,
					notificationContent.description.assets.providerAssetsSuccess
				);
				history.goBack();
				ExportExcel(entitiesEdit.assetID);
			} else {
				notificationConfig(
					'warning',
					notificationContent.content.vi.faild,
					notificationContent.description.assets.providerAssetsFail
				);
			}
		});
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Cấp phát tài sản
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
				<Spin spinning={listloading}>
					<div className="assets__form">
						<FormCustomUnusedEdit
							actionLoading={actionLoading}
							saveAddAsset={saveAddAsset}
							entitiesInformation={entitiesInformation}
							entitiesEdit={entitiesEdit}
							handleClose={ExitPage}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
