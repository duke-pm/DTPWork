/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Form from './component/index';

export default function CreateResource() {
	const histroy = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const paramsReq = 'BKResourceGroup,BKColor';
	const ExitPage = () => histroy.goBack();
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.booking.resource,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const { actionLoading, entitiesEdit } = currentState;
	const { listloading, entitiesInformation } = inforCompany;
	const groupBkColor = entitiesInformation?.bkColor
		? entitiesInformation.bkColor.reduce(
				(arr, curr) => [...arr, { value: curr.colorID, label: curr.label, color: curr.color }],
				[]
		  )
		: [];
	const bkResourceGroup = entitiesInformation?.bkResourceGroup
		? entitiesInformation.bkResourceGroup.reduce(
				(arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName }],
				[]
		  )
		: [];
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{params.type === 'updated' ? 'Cập nhật tài nguyên' : 'Tạo tài nguyên'}
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
							ExitPage={ExitPage}
							params={params}
							actionLoading={actionLoading}
							entitiesEdit={entitiesEdit}
							groupBkColor={groupBkColor}
							bkResourceGroup={bkResourceGroup}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
