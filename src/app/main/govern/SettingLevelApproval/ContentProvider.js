import { Button } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
import Text from 'app/components/Text';
import { useDispatch } from 'react-redux';
import LevelApprovalComponent from './LevelApprovalComponent';
import { fetchListLevels, setTaskEditLevel, fetchListLevelsFilter } from './reduxSettingLevel/LevelSettingActions';
import { LevelApprovalContext } from './LevelApprovalContext';

export default function ContentProvider() {
	const history = useHistory();
	const dispatch = useDispatch();
	const levelApprovalContext = useContext(LevelApprovalContext);
	const { setPage, rowPage, page, search, setSearch } = levelApprovalContext;
	const onHandleChange = e => {
		setPage(0);
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(fetchListLevelsFilter(rowPage, page, e.target.value));
		}
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(fetchListLevelsFilter(rowPage, page, search));
	};
	const handleChangeRoute = () => {
		dispatch(setTaskEditLevel(null));
		history.push('/quan-tri/cap-quyen/tao-moi/null');
	};
	useEffect(() => {
		dispatch(fetchListLevels());
	}, [dispatch]);
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Thiết lập level phê duyệt
				</Text>
				<div className="govern__header--action">
					<Search
						onChange={e => onHandleChange(e)}
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
					<LevelApprovalComponent />
				</div>
			</div>
		</div>
	);
}
