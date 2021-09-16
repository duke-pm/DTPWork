/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Typography, IconButton, Icon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual } from 'react-redux';
import { Tooltip } from 'antd';
import { useHistory, useParams } from 'react-router';
import FormCustomCorruptEdit from './FormCustomCorruptEdit';
import FormCustomEditAllocation from './FormCustomEditAllocation';

export default function FormCustomCorrupt() {
	const params = useParams();
	const history = useHistory();
	const { actionLoading, entitiesEdit, newEntitiesDetail } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading,
			newEntitiesDetail: state.confirm.newEntitiesDetail
		}),
		shallowEqual
	);
	useEffect(() => {
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);
	const ExitPage = () => history.goBack();
	return (
		<div className="container proposedManagement">
			<div className="proposedManagement__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{params.type === 'allocation'
						? 'Thông tin yêu cầu cấp phát tài sản'
						: params.type === 'bao-mat'
						? 'Báo mất tài sản'
						: 'Báo hỏng tài sản'}
				</Typography>
				<div className="projects__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="proposedManagement__content mt-8">
				{/* <Spin spinning={loading}> */}
				<div className="proposedManagement__form">
					{params.type === 'allocation' ? (
						<FormCustomEditAllocation
							actionLoading={actionLoading}
							entitiesEdit={entitiesEdit}
							newEntitiesEdit={newEntitiesDetail}
						/>
					) : (
						<FormCustomCorruptEdit
							type={params.type}
							actionLoading={actionLoading}
							// setFormControl={setFormControl}
							entitiesEdit={entitiesEdit}
							// handleOpenFormReject={handleOpenFormReject}
							handleClose={ExitPage}
						/>
					)}
				</div>
				{/* </Spin> */}
			</div>
		</div>
	);
}
