import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
import ListUserContent from './ListUserComponent';
import * as actions from './_reduxListUser/listUserActions';
import { ListUserContext } from './ListUserContext';

export default function ListUserPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const groupUserContext = useContext(ListUserContext);
	const { setPage, setSearch, search, page, rowPage, sort } = groupUserContext;
	useEffect(() => {
		dispatch(actions.fetchsListUser());
	}, [dispatch]);
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.fetchsListFilter(page, rowPage, sort.id, sort.direction, e.target.value));
		}
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.fetchsListFilter(page, rowPage, sort.id, sort.direction, search));
	};
	const handleChangeRoute = () => {
		dispatch(actions.setTaskEditListUser(null));
		history.push('/quan-tri/danh-sach-nguoi-dung/tao-moi/null');
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Danh sách người dùng
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
					<ListUserContent />
				</div>
			</div>
		</div>
	);
}
