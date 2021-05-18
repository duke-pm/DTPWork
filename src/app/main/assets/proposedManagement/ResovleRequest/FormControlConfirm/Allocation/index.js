import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// import FormCustomUsedEdit from './FormCustomUsedEdit';
import CloseIcon from '@material-ui/icons/Close';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomEdit from './FormCustomEdit';
import * as actions from '../../../_redux/confirmAction';
import { ResovleContext } from '../../ResovleRequestContext';

const useStyles = makeStyles({
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
});

export default function FormAllocation() {
	const AllocationContext = useContext(ResovleContext);
	const { diaglogAllocation, setDialogAllocation, setDialogConfirmGobal } = AllocationContext;
	const classes = useStyles();
	const dispatch = useDispatch();
	const { actionLoading, entitiesEdit, newEntitiesDetail } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading,
			newEntitiesDetail: state.confirm.newEntitiesDetail
		}),
		shallowEqual
	);
	const handleOpenReject = () => {
		setDialogConfirmGobal(true);
	};
	const handleSubmit = () => {
		const status = true;
		dispatch(actions.requestApproveResolve(entitiesEdit, status)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công', 'Phê duyệt thành công');
				setDialogAllocation(false);
			}
		});
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="lg"
			classes={{ scrollPaper: classes.scrollPaper }}
			// fullScreen
			aria-labelledby="customized-dialog-title"
			open={diaglogAllocation}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => setDialogAllocation(false)}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Thông tin yêu cầu cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit
				handleOpenReject={handleOpenReject}
				actionLoading={actionLoading}
				entitiesEdit={entitiesEdit}
				newEntitiesEdit={newEntitiesDetail}
				handleSubmitForm={handleSubmit}
			/>
		</Dialog>
	);
}
