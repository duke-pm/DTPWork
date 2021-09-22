/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { getDataUserLocalStorage, notificationConfig } from '@fuse/core/DtpConfig';
import Text from 'app/components/Text';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { Spin, Tooltip } from 'antd';
import { useHistory } from 'react-router';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../_redux/possesionActions';

const getDepartMent = getDataUserLocalStorage();

const initial = {
	assetID: '',
	assetName: '',
	qty: 1,
	assetGroup: '',
	specification: '',
	suppiler: null,
	purchaseDate: moment(Date.now()),
	warrantyPeriod: '',
	effectiveDate: moment(Date.now()),
	originalPrice: '',
	time_kh: '',
	location: '',
	note: '',
	deptCodeManager: getDepartMent?.deptCode,
	descr: '',
	DepreciationPeriod: '',

	inactive: false,

	company: '',
	category: '',
	group: '',
	asset: '',
	prefix: ''
	// prefix: '',
	// valueStart: '',
	// valueLength: ''
};
function FormCustomAll({ rowPage }) {
	const dispatch = useDispatch();
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
	const history = useHistory();
	const suppiler = entitiesInformation?.supplier
		? entitiesInformation.supplier.reduce(
				(arr, curr) => [...arr, { value: curr.supplierID, label: curr.supplierName }],
				[]
		  )
		: [];
	const department = entitiesInformation?.department
		? entitiesInformation.department.reduce(
				(arr, curr) => [...arr, { value: curr.deptCode, label: curr.deptName }],
				[]
		  )
		: [];
	const company = entitiesInformation?.company
		? entitiesInformation.company.reduce(
				(arr, curr) => [...arr, { value: curr.cmpnID, label: curr.cmpnName, shortName: curr.shortName }],
				[]
		  )
		: [];
	const category = entitiesInformation?.assetType
		? entitiesInformation.assetType.reduce(
				(arr, curr) => [...arr, { value: curr.typeID, label: curr.typeName }],
				[]
		  )
		: [];
	const group = entitiesInformation?.assetGroup
		? entitiesInformation.assetGroup.reduce(
				(arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName, typeID: curr.typeID }],
				[]
		  )
		: [];
	const assetDetail = entitiesInformation?.assetGroupDetail
		? entitiesInformation.assetGroupDetail.reduce(
				(arr, curr) => [
					...arr,
					{ value: curr.absID, label: curr.itemName, code: curr.itemCode, groupID: curr.groupID }
				],
				[]
		  )
		: [];
	const saveAsset = (values, prefix) => {
		if (entitiesEdit && entitiesEdit.assetID) {
			dispatch(actions.updatedPossesionAll(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.gobal.vi.updatedSuccess
					);
					history.goBack();
				} else {
					notificationConfig(
						'warning',
						notificationContent.content.vi.faild,
						notificationContent.description.gobal.vi.UpdatedFaild
					);
				}
			});
		} else {
			dispatch(actions.createdPossesionAll(values, prefix, 25)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.gobal.vi.createdSuccess
					);
					history.goBack();
				} else {
					notificationConfig(
						'warning',
						notificationContent.content.vi.faild,
						notificationContent.description.gobal.vi.createdFaild
					);
				}
			});
		}
	};
	let newIntialState;
	if (entitiesEdit) {
		newIntialState = {
			assetID: entitiesEdit?.assetID,
			assetName: entitiesEdit?.assetName,
			suppiler: entitiesEdit?.suppiler === 0 ? null : entitiesEdit.suppiler,
			descr: entitiesEdit?.descr,
			purchaseDate: entitiesEdit?.purchaseDate,
			effectiveDate: entitiesEdit?.effectiveDate,
			depreciationPeriod: entitiesEdit?.depreciationPeriod,
			warrantyPeriod: entitiesEdit?.warrantyPeriod,
			originalPrice: entitiesEdit?.originalPrice,
			deptCodeManager: entitiesEdit?.deptCodeManager,
			inactive: entitiesEdit?.inactive
		};
	}
	const ExitPage = () => {
		history.goBack();
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					{entitiesEdit?.assetID ? 'Cập nhật tài sản' : 'Tạo mới tài sản'}
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
						<FormCustomEdit
							assetDetail={assetDetail}
							group={group}
							category={category}
							company={company}
							department={department}
							suppiler={suppiler}
							actionLoading={actionLoading}
							saveAsset={saveAsset}
							initialValue={entitiesEdit?.assetID ? newIntialState : initial}
							handleClose={ExitPage}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
export default React.memo(FormCustomAll);
