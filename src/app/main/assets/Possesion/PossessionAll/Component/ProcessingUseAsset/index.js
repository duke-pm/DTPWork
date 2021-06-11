import { AppBar, Dialog, IconButton, Toolbar, makeStyles, DialogContent } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import InformationProceeUseAsset from './InformationProceeUseAsset';

export default function ProcessingUseAsset({ openHistory, setOpenHistory }) {
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const classes = DtpCustomStyles();
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
			<DialogContent style={{ height: '65vh' }}>
				<InformationProceeUseAsset actionLoading={actionLoading} entitiesEdit={entitiesEdit} />
			</DialogContent>
		</Dialog>
	);
}
