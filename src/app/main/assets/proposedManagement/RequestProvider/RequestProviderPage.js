/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router';
import RequestProviderBody from './ComponentsRequestProvider/RequestProviderBody';
// import RequestProviderHeader from './ComponentsRequestProvider/RequestProviderHeader';
import * as actions from '../_redux/confirmAction';

export default function RequestProviderPage() {
	const history = useHistory();
	const dataUser = getDataUserLocalStorage();
	const [initialState, setInitialState] = useState({
		name: dataUser.empCode || '',
		nameEmp: dataUser.fullName || '',
		department: dataUser.deptCode || '',
		dateRequest: moment(Date.now()),
		region: '',
		jobTitle: '',
		locationUse: dataUser.deptCode || '',
		reason: '',
		assetsCategory: 'N',
		plan: true,
		supplier: ''
	});
	const [dataSource, setDataSource] = useState([]);
	const dispatch = useDispatch();
	const params = 'Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail';
	useEffect(() => {
		dispatch(actions.getInformationCompany(params));
	}, [dispatch]);
	const { actionLoading, entitiesInformation } = useSelector(
		state => ({
			entitiesInformation: state.confirm.entitiesInformation,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	const ExitPage = () => history.goBack();
	return (
		<>
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Yêu cầu cấp phát tài sản
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
					<div>
						<RequestProviderBody
							dataSource={dataSource}
							setDataSource={setDataSource}
							initialState={initialState}
							setInitialState={setInitialState}
							actionLoading={actionLoading}
							entitiesInformation={entitiesInformation}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
