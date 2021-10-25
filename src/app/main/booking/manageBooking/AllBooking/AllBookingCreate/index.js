/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';
import queryString from 'query-string';
import Form from './component/index';

export default function AllBookingCreate() {
	const histroy = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const location = useLocation();
	const idResource = location?.search && queryString.parse(location?.search);
	const ExitPage = () => histroy.goBack();
	const paramsReq = 'BKResource,Users';
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.booking.booking,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const { actionLoading, entitiesEdit } = currentState;
	const { listloading, entitiesInformation } = inforCompany;
	const bkResource = entitiesInformation?.bkReSource
		? entitiesInformation.bkReSource.reduce(
				(arr, curr) => [...arr, { value: curr.resourceID, label: curr.resourceName }],
				[]
		  )
		: [];
	const Users = entitiesInformation?.users
		? entitiesInformation.users.reduce((arr, curr) => [...arr, { value: curr.empID, label: curr.empName }], [])
		: [];
	useEffect(() => {
		if (!entitiesEdit && params.type === 'updated') histroy.goBack();
	}, [entitiesEdit, histroy, params.type]);
	return (
		<div className="container booking">
			<div className="booking__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{' '}
					{params.type === 'updated' ? 'Cập nhật booking' : 'Tạo booking'}
				</Typography>
				<div className="booking__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="booking__content mt-8">
				<Spin spinning={listloading}>
					<div className="create-booking">
						<Form
							resource_id={idResource?.resource}
							entitiesEdit={entitiesEdit}
							ExitPage={ExitPage}
							actionLoading={actionLoading}
							bkResource={bkResource}
							Users={Users}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
