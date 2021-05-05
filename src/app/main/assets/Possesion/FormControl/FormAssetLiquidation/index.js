import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { notificationConfig } from '@fuse/core/DtpConfig';
import * as action from '../../_redux/possesionActions';
import FormCustomLiquidation from './FormCustomLiquidation';
import { PossessionContext } from '../../PossessionContext';

export default function FormAssetLiquidation() {
	const AssetContext = useContext(PossessionContext);
	const { liquiAsset, setLiquiAsset } = AssetContext;
	const dispatch = useDispatch();
	const handleClose = () => setLiquiAsset(false);
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const saveWithDraw = values => {
		dispatch(action.withdrawPossesion(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công!', 'Cập nhật thành công');
				setLiquiAsset(false);
			} else {
				notificationConfig('warning', 'Thất bại!', 'Cập nhật thất bại vui lòng thử lại');
			}
		});
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="md"
			aria-labelledby="customized-dialog-title"
			open={liquiAsset}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Thanh lý tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomLiquidation
				actionLoading={actionLoading}
				saveWithDraw={saveWithDraw}
				entitiesEdit={entitiesEdit}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
