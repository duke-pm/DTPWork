import React, { useEffect } from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as moment from 'moment';
import { notification } from 'antd';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../_redux/possesionActions';

const initial = {
	assetName: '',
	qty: null,
	assetGroup: '',
	specification: '',
	suppiler: '',
	purchaseDate: '',
	warrantyPeriod: '',
	effectiveDate: '',
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
	asset: ''
	// prefix: '',
	// valueStart: '',
	// valueLength: ''
};
export default function FormCustomAll({ handleClose, open }) {
	const dispatch = useDispatch();
	const { entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit
		}),
		shallowEqual
	);
	const saveAsset = values => {
		// if (entitiesEdit && entitiesEdit.assetID) {
		dispatch(actions.createdPossesionAll(values)).then(data => {
			if (!data.isError) {
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
		// }
		const PurchaseDate = moment(new Date(values.PurchaseDate)).format('DD/MM/YYY');
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
				saveAsset={saveAsset}
				initialValue={entitiesEdit && entitiesEdit.assetID ? entitiesEdit : initial}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
