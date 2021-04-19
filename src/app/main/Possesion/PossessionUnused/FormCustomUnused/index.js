import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import FormCustomUnusedEdit from './FormCustomUnusedEdit';

export default function FormCustomUnused({ handleClose, open }) {
	// const dispatch = useDispatch();
	const { entitiesEdit, entitiesInformation } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
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
						Cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomUnusedEdit
				entitiesInformation={entitiesInformation}
				entitiesEdit={entitiesEdit}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
