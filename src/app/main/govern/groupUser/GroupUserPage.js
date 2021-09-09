import { Button, Typography } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GroupUserContent from './GroupUserComponent/GroupUserContent';
import { GroupUserContext } from './GroupUserContext';
import { setTaskEditGroupUser, filterGroupUser } from './_reduxGroupUser/groupUserActions';

export default function GroupUserPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const handleChangeRoute = () => {
		dispatch(setTaskEditGroupUser(null));
		history.push('/quan-tri/nhom-nguoi-dung/tao-moi/null');
	};
	const groupUserContext = useContext(GroupUserContext);
	const { setPage, setSearch, search, page, rowPage, sort } = groupUserContext;
	const handleSearch = () => {
		setPage(0);
		dispatch(filterGroupUser(rowPage, page, sort.id, sort.direction, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(filterGroupUser(rowPage, page, sort.id, sort.direction, e.target.value));
		}
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{' '}
					Nhóm người dùng{' '}
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
					<GroupUserContent />
				</div>
			</div>
		</div>
	);
}
