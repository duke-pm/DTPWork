/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { AddCircleOutline } from '@material-ui/icons';
import * as actions from '../../../_redux/possesionActions';
import { PossessionContext } from '../../../PossessionContext';

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

export default function ActionComponent({ value, handleOpenForm }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const possesionConext = useContext(PossessionContext);
	const { search, setSearch, rowPage, page, setPage, sort } = possesionConext;
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.searchPossesion(value, search, rowPage, page, sort.id, sort.direction));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.searchPossesion(value, e.target.value, rowPage, page, sort.id, sort.direction));
		}
	};
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-row items-center justify-between">
				<Button
					onClick={handleOpenForm}
					className="mt-8 sm:mt-0 mb-8 sm:mb-0 h-26"
					variant="contained"
					color="primary"
					startIcon={<AddCircleOutline />}
				>
					Thêm mới
				</Button>
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
					/>
					<IconButton onClick={handleSearch} type="button" className={classes.iconButton}>
						<SearchIcon />
					</IconButton>
					{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
				</Paper>
			</div>
		</FuseAnimate>
	);
}
