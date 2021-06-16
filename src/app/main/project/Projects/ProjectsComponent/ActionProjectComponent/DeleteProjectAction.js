import {
	AppBar,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Toolbar,
	Typography,
	Button,
	Divider
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Result, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../_redux/_projectActions';

export default function DeleteProjectAction({ actionLoading, itemDelete, handleCloseDelete }) {
	const dispatch = useDispatch();
	const handlDeleteItem = () => {
		dispatch(deleteProject(itemDelete.item.prjID)).then(data => {
			if (data && !data.isError) {
				handleCloseDelete();
			}
		});
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="sm"
			aria-labelledby="customized-dialog-title"
			open={itemDelete.open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseDelete} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Delete project
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<Result
					status="warning"
					title={`Are you sure delete project:  ${itemDelete.item && itemDelete.item.prjName} ?`}
				/>
				,
			</DialogContent>
			<Divider />
			<DialogActions>
				{actionLoading ? (
					<Spin size="middle" />
				) : (
					<Button
						onClick={handlDeleteItem}
						type="submit"
						className="h-26 font-sans"
						variant="contained"
						color="primary"
					>
						Delete
					</Button>
				)}
				<Button
					type="button"
					onClick={handleCloseDelete}
					className="h-26 font-sans"
					variant="contained"
					color="secondary"
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
