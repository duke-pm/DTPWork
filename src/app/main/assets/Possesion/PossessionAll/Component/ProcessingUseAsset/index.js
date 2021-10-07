/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Spin, Tooltip } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import Text from 'app/components/Text';
import { useHistory } from 'react-router';
import InformationProceeUseAsset from './InformationProceeUseAsset';

export default function ProcessingUseAsset() {
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
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Nhật ký tài sản
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
				<div className="assets__history">
					<Spin spinning={actionLoading}>
						<InformationProceeUseAsset actionLoading={actionLoading} entitiesEdit={entitiesEdit} />
					</Spin>
				</div>
			</div>
		</div>
	);
}
