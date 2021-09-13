import Search from 'antd/lib/input/Search';
import { Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SettingMenuContent from './SettingMenuComponent/SettingMenuContent';
import * as actions from './_redux/menuActions';
import { SettingmenuContext } from './SettingMenuContext';

export default function SettingMenuPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const SettingMenuHeaderContext = useContext(SettingmenuContext);
	const { setPage, setSearch, page, rowPage, sort, search } = SettingMenuHeaderContext;

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
	const handleChangeRoute = () => {
		dispatch(actions.setTaskEditMenuSetting(null));
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
