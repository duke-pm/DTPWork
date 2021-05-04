import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import RequestProviderBody from './ComponentsRequestProvider/RequestProviderBody';
import RequestProviderHeader from './ComponentsRequestProvider/RequestProviderHeader';
import * as actions from '../_redux/confirmAction';

export default function RequestProviderPage() {
	const dataUser = getDataUserLocalStorage();
	const [initialState, setInitialState] = useState({
		name: dataUser.empCode || '',
		nameEmp: dataUser.fullName || '',
		department: null,
		dateRequest: moment(Date.now()),
		region: '',
		jobTitle: '',
		locationUse: '',
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
	const handleSubmitForm = (values, assets) => {
		// dispatch(actions.requestAssetFromUserAction(values, assets)).then(data => {
		// 	if (data && !data.isError) {
		// 		notificationConfig('success', 'Thành công!', 'Yêu cầu thành công !!');
		// 		setInitialState({
		// 			...initialState,
		// 			locationUse: '',
		// 			reason: '',
		// 			assetsCategory: 'N',
		// 			plan: true,
		// 			supplier: ''
		// 		});
		// 	} else {
		// 		// notificationConfig('warning', 'Thất bại!', 'Yêu cầu thất bại vui lòng thử lại');
		// 	}
		// });
		setDataSource([]);
	};
	return (
		<FusePageCardedFix
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<RequestProviderHeader />}
			content={
				<RequestProviderBody
					dataSource={dataSource}
					setDataSource={setDataSource}
					initialState={initialState}
					setInitialState={setInitialState}
					actionLoading={actionLoading}
					handleSubmitForm={handleSubmitForm}
					entitiesInformation={entitiesInformation}
				/>
			}
			innerScroll
		/>
	);
}
