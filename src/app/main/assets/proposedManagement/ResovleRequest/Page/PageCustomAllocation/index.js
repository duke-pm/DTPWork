/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notificationConfig } from '@fuse/core/DtpConfig';
import CustomAllocationContextProvider from './PageCustomAllocation';
import FormConfirmGobal from './FormConfirmGobal';
import FormCustomEdit from './FormCustomEdit';
import { requestApproveResolve } from '../../../_redux/confirmAction';

export default function PageCustomCorrupt() {
	const dispatch = useDispatch();
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
	const ExitPage = () => {
		history.goBack();
	};
	const handleSubmit = () => {
		const status = true;
		dispatch(requestApproveResolve(entitiesEdit, status)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công', 'Phê duyệt thành công');
				history.goBack();
			}
		});
	};
	return (
		<CustomAllocationContextProvider>
			<FormConfirmGobal />
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Thông tin yêu cầu cấp phát tài sản
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
					<div className="proposedManagement__Allocation">
						<FormCustomEdit
							actionLoading={actionLoading}
							entitiesEdit={entitiesEdit}
							newEntitiesEdit={newEntitiesDetail}
							handleSubmitForm={handleSubmit}
						/>
					</div>
					{/* </Spin> */}
				</div>
			</div>
		</CustomAllocationContextProvider>
	);
}
