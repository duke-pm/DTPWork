import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { SettingLineContext } from '../../SettingLineContext';

export default function ActionHeaderLine({ classes }) {
	// const dispatch = useDispatch();
	const settingLineContext = useContext(SettingLineContext);
	const { search, rowPage, page, setForm } = settingLineContext;
	const handleOpenFormLine = () => {
		setForm(true);
		// dispatch(setTaskEditProject(null));
	};
	// const handleSearch = () => {
	// 	dispatch(
	// 		fetchProjectDetailFilter(params.detail, rowPage, page, ownerFilter, status, dateStart, sector, search)
	// 	);
	// 	dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
	// };
	// const onHandleChange = e => {
	// 	setSearch(e.target.value);

	// 	if (e.target.value.length <= 0) {
	// 		dispatch(
	// 			fetchProjectDetailFilter(
	// 				params.detail,
	// 				rowPage,
	// 				page,
	// 				ownerFilter,
	// 				status,
	// 				dateStart,
	// 				sector,
	// 				e.target.value
	// 			)
	// 		);
	// 	}
	// };
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex sm:flex-row flex-col-reverse justify-between">
					<div className="flex flex-row justify-between">
						<Button
							onClick={handleOpenFormLine}
							className="mt-8 sm:mt-0 mb-8 sm:mb-0 h-26 max-w-160 "
							variant="contained"
							color="primary"
							startIcon={<AddCircleOutline />}
						>
							Create
						</Button>
					</div>

					<Paper className="flex justify-between">
						<InputBase
							onKeyPress={event => {
								if (event.key === 'Enter') {
									// handleSearch();
								}
							}}
							// onChange={e => onHandleChange(e)}
							className={classes.input}
							value={search}
							placeholder="Search"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
							// onClick={handleSearch}
							type="button"
							className={classes.iconButton}
							aria-label="search"
						>
							<SearchIcon />
						</IconButton>
					</Paper>
				</div>
			</FuseAnimateGroup>
		</div>
	);
}
