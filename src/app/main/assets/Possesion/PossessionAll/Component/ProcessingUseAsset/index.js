import { AppBar, Dialog, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import InformationProceeUseAsset from './InformationProceeUseAsset';

const useStyles = makeStyles({
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
});

export default function ProcessingUseAsset({ openHistory, setOpenHistory }) {
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const classes = useStyles();
	const handleClose = () => setOpenHistory(false);
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			classes={{ scrollPaper: classes.scrollPaper }}
			maxWidth="lg"
			open={openHistory}
			aria-labelledby="customized-dialog-title"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography
						variant="subtitle1"
						style={{ color: 'white', fontWeight: '400', fontSize: '1.6rem' }}
						color="inherit"
					>
						Quá trình sử dụng tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<div>
				<InformationProceeUseAsset actionLoading={actionLoading} entitiesEdit={entitiesEdit} />
			</div>
		</Dialog>
	);
}
