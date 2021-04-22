import { IconButton, InputBase, Paper, Button } from '@material-ui/core';
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
export default function ActionComponent({ handleOpenForm, value }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const possesionConext = useContext(PossessionContext);
	const { search, setSearch, rowPage, page, setPage } = possesionConext;
	const handleSearch = e => {
		e.preventDefault();
		setPage(0);
		dispatch(actions.searchPossesion(value, search, rowPage, page));
	};
	onkeypress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setPage(0);
			dispatch(actions.searchPossesion(value, search, rowPage, page));
		}
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			setPage(0);
			dispatch(actions.searchPossesion(value, search, rowPage, page));
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
				<Button
					onClick={handleOpenForm}
					className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
					variant="contained"
					color="primary"
				>
					{' '}
					<svg
						className="h-16 w-16"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Yêu cầu cấp phát tài sản
				</Button>{' '}
			</div>
		</FuseAnimate>
	);
}
