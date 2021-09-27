/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Form from './component/index';

export default function CreateResourceGroup() {
	const histroy = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const paramsReq = 'BKIcon';
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const ExitPage = () => histroy.goBack();
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.booking.resourceGroup,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const { actionLoading, entitiesEdit } = currentState;
	const { listloading, entitiesInformation } = inforCompany;
	const groupBkIcon = entitiesInformation?.bkIcon
		? entitiesInformation.bkIcon.reduce(
				(arr, curr) => [...arr, { value: curr.iconID, label: curr.label, icon: curr.icon }],
				[]
		  )
		: [];
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{' '}
					{params.type === 'updates' ? 'Update resource group' : 'Created resource group'}
				</Typography>
				<div className="resource__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="resource__content mt-8">
				<Spin spinning={listloading}>
					<div className="createresource">
						<Form
							params={params}
							entitiesEdit={entitiesEdit}
							actionLoading={actionLoading}
							bkIcon={groupBkIcon}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
