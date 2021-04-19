import { Button, IconButton, Paper, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import * as actions from '../../_redux/possesionActions';
import { PossessionContext } from '../../PossessionContext';

const useStyles = makeStyles(theme => ({
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

function ActionComponent(props) {
	const classes = useStyles();
	const { value } = props;
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
					{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
				</Paper>
			</div>
		</FuseAnimate>
	);
}
export default React.memo(ActionComponent);
