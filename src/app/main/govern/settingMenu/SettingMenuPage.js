import Search from 'antd/lib/input/Search';
import { Box, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import FormMenuComponent from './SettingMenuComponent/FormMenuComponent';
import SettingMenuContent from './SettingMenuComponent/SettingMenuContent';
import * as actions from './_redux/menuActions';

export default function SettingMenuPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [openSettingMenu, setOpenSettingMenu] = useState(false);
	const handleOpenSettingMenu = () => {
		setOpenSettingMenu(true);
		dispatch(actions.setTaskEditMenuSetting(null));
	};
	const onHandleChange = () => {};
	const handleSearch = () => {};
	const handleChangeRoute = () => {
		history.push('/quan-tri/thiet-lap-menu/tao-moi/null');
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Thiết lập menu
				</Typography>
				<div className="govern__header--action">
					<Search
						onChange={e => onHandleChange(e)}
						onKeyPress={event => {
							if (event.key === 'Enter') {
								handleSearch();
							}
						}}
						className="input__search"
						placeholder="Search"
						onSearch={handleSearch}
					/>
					<Button onClick={handleChangeRoute} className="button__create" variant="contained" color="primary">
						{' '}
						<Typography variant="body2"> Tạo mới </Typography>
					</Button>
				</div>
			</div>
			<div className="govern__content mt-8">
				<div className="govern__content--table px-16">
					<SettingMenuContent />
				</div>
			</div>
		</div>
	);
}
