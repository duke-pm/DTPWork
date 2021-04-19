import React, { useEffect } from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { notification } from 'antd';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../_redux/possesionActions';

const initial = {
	assetID: '',
	assetName: '',
	qty: null,
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
	deptCodeManager: '',
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
					notification.success({
						message: 'Thành công!',
						description: 'Cập nhật thành công'
					});
					handleClose();
				} else {
					notification.warning({
						message: 'Thất bại!',
						description: 'Cập nhật thất bại vui lòng thử lại'
					});
				}
			});
		} else {
			dispatch(actions.createdPossesionAll(values, prefix, rowPage)).then(data => {
				if (data && !data.isError) {
					notification.success({
						message: 'Thành công!',
						description: 'Tạo thông báo mới thành công'
					});
					handleClose();
				} else {
					notification.warning({
						message: 'Thất bại!',
						description: 'Tạo thông báo mới thất bại vui lòng thử lại'
					});
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
						Ghi gia tăng tài sản theo lô
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
