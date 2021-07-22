import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { AddCircleOutline } from '@material-ui/icons';
import * as actions from '../_redux/menuActions';
import { SettingmenuContext } from '../SettingMenuContext';

export default function SettingMenuHeader({ handleOpenSettingMenu }) {
	const SettingMenuHeaderContext = useContext(SettingmenuContext);
	const { setPage, setSearch, page, rowPage, sort, search } = SettingMenuHeaderContext;

	const dispatch = useDispatch();
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.fetchsListMenuSettingParams(rowPage, page, sort.direction, sort.id, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.fetchsListMenuSettingParams(rowPage, page, sort.direction, sort.id, e.target.value));
		}
	};
	return (
		<div>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex sm:flex-row flex-col-reverse justify-between">
					<Button
						onClick={handleOpenSettingMenu}
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
