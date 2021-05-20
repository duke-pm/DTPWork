import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography } from '@material-ui/core';
import RequestProviderBody from './ComponentsRequestProvider/RequestProviderBody';
// import RequestProviderHeader from './ComponentsRequestProvider/RequestProviderHeader';
import * as actions from '../_redux/confirmAction';

export default function RequestProviderPage() {
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
	return (
		<FusePageCarded
			classes={{
				header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<div className="flex flex-1 flex-col items-center sm:items-start">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography
								className="text-16 sm:text-20 truncate"
								// component={Link}
								// role="button"
								// to="/apps/e-commerce/orders"
								color="inherit"
							>
								{/* {xhtm} */}
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			contentToolbar={
				<div className="flex  items-center px-16 flex-1">
					<Typography component="span" className="font-bold flex text-sm	">
						Yêu cầu cấp phát
					</Typography>
				</div>
			}
			content={
				<RequestProviderBody
					dataSource={dataSource}
					setDataSource={setDataSource}
					initialState={initialState}
					setInitialState={setInitialState}
					actionLoading={actionLoading}
					entitiesInformation={entitiesInformation}
				/>
			}
			innerScroll
		/>
	);
}
