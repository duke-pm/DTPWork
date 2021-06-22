import React from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import CloseIcon from '@material-ui/icons/Close';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../_redux/possesionActions';

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
	deptCodeManager: 'LA0000',
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
function FormCustomAll({ handleClose, open, rowPage }) {
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading, entitiesInformation } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
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
					handleClose();
				} else {
					notificationConfig(
						'warning',
						notificationContent.content.vi.faild,
						notificationContent.description.gobal.vi.UpdatedFaild
					);
				}
			});
		} else {
			dispatch(actions.createdPossesionAll(values, prefix, rowPage)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.gobal.vi.createdSuccess
					);
					handleClose();
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
	return (
		<Dialog style={{ zIndex: 20 }} fullWidth maxWidth="md" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{entitiesEdit?.assetID ? 'Cập nhật tài sản' : 'Tạo mới tài sản'}
					</Typography>
				</Toolbar>
			</AppBar>
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
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
export default React.memo(FormCustomAll);
