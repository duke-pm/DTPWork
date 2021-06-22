import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormListUserCustom from './FormListUserCustom';
import * as actions from '../../_reduxListUser/listUserActions';

export default function FormListUser({ open, handleCloseFormGroupUser }) {
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.govern.listUser,
			inforCompany: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading } = currentState;
	const handleSubmitFormListUser = values => {
		if (entitiesEdit && entitiesEdit.userID) {
			dispatch(actions.updatedListUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.listUser.updatedListUserSuccess
					);
					handleCloseFormGroupUser();
				}
			});
		} else {
			dispatch(actions.createdListUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.listUser.createdListUserSuccess
					);
					handleCloseFormGroupUser();
				}
			});
		}
	};
	const groupUser = inforCompany?.userGroup
		? inforCompany.userGroup.reduce((arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName }], [])
		: [];
	const arrCompany = inforCompany?.company
		? inforCompany.company.reduce((arr, curr) => [...arr, { value: curr.cmpnID, label: curr.cmpnName }], [])
		: [];
	const arrBizLine = inforCompany?.bizlines
		? inforCompany.bizlines.reduce((arr, curr) => [...arr, { value: curr.bizLineID, label: curr.bizLineName }], [])
		: [];
	const arrSales = inforCompany?.sales
		? inforCompany.sales.reduce((arr, curr) => [...arr, { value: curr.slpCode, label: curr.slpName }], [])
		: [];
	const arrManag = inforCompany?.users
		? inforCompany.users.reduce((arr, curr) => [...arr, { value: curr.empID, label: curr.empName }], [])
		: [];
	const arrSap = inforCompany?.employees
		? inforCompany.employees.reduce((arr, curr) => [...arr, { value: curr.empCode, label: curr.empName }], [])
		: [];
	const arrRegion = inforCompany?.region
		? inforCompany.region.reduce((arr, curr) => [...arr, { value: curr.regionID, label: curr.regionName }], [])
		: [];
	return (
		<Dialog fullWidth style={{ zIndex: 20 }} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormGroupUser} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{entitiesEdit && entitiesEdit.userID ? 'Cập nhật người dùng' : 'Tạo mới người dùng'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormListUserCustom
				arrCompany={arrCompany}
				arrSales={arrSales}
				arrManag={arrManag}
				arrSap={arrSap}
				arrRegion={arrRegion}
				groupUser={groupUser}
				arrBizLine={arrBizLine}
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleSubmitFormListUser={handleSubmitFormListUser}
				handleCloseFormGroupUser={handleCloseFormGroupUser}
			/>
		</Dialog>
	);
}
