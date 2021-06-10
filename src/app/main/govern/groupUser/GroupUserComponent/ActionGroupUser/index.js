/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import * as actions from '../../_reduxGroupUser/groupUserActions';

import { GroupUserContext } from '../../GroupUserContext';

export default function ActionGroupUser({ handleOpenFormGroupUser }) {
	const dispatch = useDispatch();
	const groupUserContext = useContext(GroupUserContext);
	const { setPage, setSearch, search, page, rowPage, sort } = groupUserContext;
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.filterGroupUser(page, rowPage, sort.id, sort.direction, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.filterGroupUser(page, rowPage, sort.id, sort.direction, e.target.value));
		}
	};
	return (
		<div>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex flex-col sm:flex-row justify-between">
					<Button
						onClick={handleOpenFormGroupUser}
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
						Thêm mới
					</Button>
					<Paper className="w-full sm:w-1/4 flex justify-between">
						<InputBase
							onKeyPress={event => {
								if (event.key === 'Enter') {
									handleSearch();
								}
							}}
							onChange={e => onHandleChange(e)}
							className="ml-8"
							value={search}
							placeholder="Tìm kiếm"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
						// onClick={handleSearch} type="button" className={classes.iconButton}
						>
							<SearchIcon />
						</IconButton>
						{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
					</Paper>
				</div>
			</FuseAnimate>
		</div>
	);
}
