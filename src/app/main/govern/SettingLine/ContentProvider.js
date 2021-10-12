import { Button } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
import Text from 'app/components/Text';
import ProjectComponent from './LineComponent';
import { fetchListLines, fetchListLinesFilter, setTaskEditLine } from './reduxSettingLine/LineSettingActions';
import { SettingLineContext } from './SettingLineContext';

export default function ContentProvider() {
	const history = useHistory();
	const dispatch = useDispatch();
	const lineContext = useContext(SettingLineContext);
	const { setPage, rowPage, page, search, setSearch } = lineContext;
	useEffect(() => {
		dispatch(fetchListLines());
	}, [dispatch]);
	const onHandleChange = e => {
		setPage(0);
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(fetchListLinesFilter(rowPage, page, e.target.value));
		}
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(fetchListLinesFilter(rowPage, page, search));
	};
	const handleChangeRoute = () => {
		dispatch(setTaskEditLine(null));
		history.push('/quan-tri/quyen/tao-moi/null');
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Thiết lập line phê duyệt
				</Text>
				<div className="govern__header--action">
					<Search
						onChange={onHandleChange}
						className="input__search"
						placeholder="Search"
						onSearch={handleSearch}
					/>
					<Button onClick={handleChangeRoute} className="button__create" variant="contained" color="primary">
						<Text type="button" color="white">
							Tạo mới
						</Text>
					</Button>
				</div>
			</div>
			<div className="govern__content mt-8">
				<div className="govern__content--table px-16">
					<ProjectComponent />
				</div>
			</div>
		</div>
	);
}
