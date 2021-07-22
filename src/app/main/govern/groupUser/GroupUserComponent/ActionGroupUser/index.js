/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { AddCircleOutline } from '@material-ui/icons';
import * as actions from '../../_reduxGroupUser/groupUserActions';

import { GroupUserContext } from '../../GroupUserContext';

export default function ActionGroupUser({ handleOpenFormGroupUser }) {
	const dispatch = useDispatch();
	const groupUserContext = useContext(GroupUserContext);
	const { setPage, setSearch, search, page, rowPage, sort } = groupUserContext;
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.filterGroupUser(rowPage, page, sort.id, sort.direction, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.filterGroupUser(rowPage, page, sort.id, sort.direction, e.target.value));
		}
	};
	return (
		<div>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex sm:flex-row flex-col-reverse justify-between">
					<Button
						onClick={handleOpenFormGroupUser}
						className="mt-8 sm:mt-0 mb-8 sm:mb-0 h-26 max-w-160 "
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
							className="ml-8"
							value={search}
							placeholder="Tìm kiếm"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton onClick={handleSearch} type="button">
							<SearchIcon />
						</IconButton>
						{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
					</Paper>
				</div>
			</FuseAnimate>
		</div>
	);
}
