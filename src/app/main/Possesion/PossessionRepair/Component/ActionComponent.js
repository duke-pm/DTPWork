import { IconButton, InputBase, Paper, TextField } from '@material-ui/core';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as actions from '../../_redux/possesionActions';

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
	const { value } = props;
	const dispatch = useDispatch();
	const [search, setSearch] = React.useState('');
	const handleSearch = e => {
		e.preventDefault();
		dispatch(actions.searchPossesion(value, search));
	};
	onkeypress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			dispatch(actions.searchPossesion(value, search));
		}
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(actions.searchPossesion(value, search));
		}
	};
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-col sm:flex-row justify-between">
				<Paper component="form" className="w-full sm:w-1/4 flex justify-between">
					<InputBase
						onKeyPress={e => onkeypress(e)}
						onChange={e => onHandleChange(e)}
						className={classes.input}
						value={search}
						placeholder="Tìm kiếm"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton
						onClick={e => handleSearch(e)}
						type="button"
						className={classes.iconButton}
						aria-label="search"
					>
						<SearchIcon />
					</IconButton>
				</Paper>
			</div>
		</FuseAnimate>
	);
}
