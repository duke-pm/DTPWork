import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../_redux/possesionActions';

const initial = {
	assetID: '',
	assetName: '',
	qty: 1,
	assetGroup: '',
	specification: '',
	suppiler: '',
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

	company: '',
	category: '',
	group: '',
	asset: '',
	prefix: ''
	// prefix: '',
	// valueStart: '',
	// valueLength: ''
};
export default function FormCustomAll({ handleClose, open, rowPage }) {
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const saveAsset = (values, prefix) => {
		if (entitiesEdit && entitiesEdit.assetID) {
			dispatch(actions.updatedPossesionAll(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công!', 'Cập nhật thành công');
					handleClose();
				} else {
					notificationConfig('warning', 'Thất bại!', 'Cập nhật thất bại vui lòng thử lại');
				}
			});
		} else {
			dispatch(actions.createdPossesionAll(values, prefix, rowPage)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công!', 'Tạo mới thành công');
					handleClose();
				} else {
					notificationConfig('warning', 'Thất bại!', 'Tạo mới thất bại');
				}
			});
		}
	};
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="md"
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{entitiesEdit && entitiesEdit.assetID ? 'Cập nhật mới tài sản' : 'Tạo mới tài sản'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit
				actionLoading={actionLoading}
				saveAsset={saveAsset}
				initialValue={entitiesEdit && entitiesEdit.assetID ? entitiesEdit : initial}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
