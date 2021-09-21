import { Button } from '@material-ui/core';
import React from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
import Text from 'app/components/Text';
import LevelApprovalComponent from './LevelApprovalComponent';
// import { LevelApprovalContext } from './LevelApprovalContext';

export default function ContentProvider() {
	const history = useHistory();
	// const { currentState, project } = useSelector(
	// 	state => ({
	// 		currentState: state.possesion.entitiesInformation,
	// 		projectAll: state.project.entitiesAll,
	// 		project: state.project.entitiesDetail,
	// 		listLoading: state.project.listLoading
	// 	}),
	// 	shallowEqual
	// );
	// const levelApprovalContext = useContext(LevelApprovalContext);
	// const { form, setForm } = levelApprovalContext;
	// const classes = DtpCustomStyles();
	// const dispatch = useDispatch();
	const onHandleChange = e => {};
	const handleSearch = () => {};
	const handleChangeRoute = () => {
		history.push('/quan-tri/cap-quyen/tao-moi/null');
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Cấp quyền
				</Text>
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
