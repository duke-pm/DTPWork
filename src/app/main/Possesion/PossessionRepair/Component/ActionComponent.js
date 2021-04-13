import { IconButton, InputBase, Paper, TextField } from '@material-ui/core';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}));
export default function ActionComponent(props, { handleOpenForm }) {
	const classes = useStyles(props);
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-col sm:flex-row justify-between">
				<Paper component="form" className="w-full sm:w-1/4 flex justify-between">
					<InputBase
						className={classes.input}
						placeholder="Tìm kiếm"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton type="button" className={classes.iconButton} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
			</div>
		</FuseAnimate>
	);
}
