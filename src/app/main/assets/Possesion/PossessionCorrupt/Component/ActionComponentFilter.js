import { IconButton, InputBase, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as actions from '../../_redux/possesionActions';
import { PossessionContext } from '../../PossessionContext';

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
export default function ActionComponentFilter(props, { handleOpenForm }) {
	const classes = useStyles(props);
	const { value } = props;
	const dispatch = useDispatch();
	const possesionConext = useContext(PossessionContext);
	const { search, setSearch, rowPage, page, setPage, sort } = possesionConext;
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.searchPossesion(value, search, rowPage, page, sort.id, sort.direction));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			setPage(0);
			dispatch(actions.searchPossesion(value, e.target.value, rowPage, page, sort.id, sort.direction));
		}
	};
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-col sm:flex-row justify-end">
				<Paper className="flex justify-between">
					<InputBase
						onKeyPress={event => {
							if (event.key === 'Enter') {
								handleSearch();
							}
						}}
						onChange={e => onHandleChange(e)}
						className={classes.input}
						value={search}
						placeholder="Tìm kiếm"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton onClick={handleSearch} type="button" className={classes.iconButton} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
			</div>
		</FuseAnimate>
	);
}
