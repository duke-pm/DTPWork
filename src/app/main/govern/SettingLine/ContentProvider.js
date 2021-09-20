import { Button, Typography } from '@material-ui/core';
import React from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
import ProjectComponent from './LineComponent';
// import { SettingLineContext } from './SettingLineContext';

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
	// const settingLineContext = useContext(SettingLineContext);
	// const { form, setForm } = settingLineContext;
	// const classes = DtpCustomStyles();
	// const dispatch = useDispatch();
	const onHandleChange = e => {};
	const handleSearch = () => {};
	const handleChangeRoute = () => {
		history.push('/quan-tri/quyen/tao-moi/null');
	};
	return (
		<div className="container govern">
			<div className="govern__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Quyền
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
						<Typography variant="button"> Tạo mới </Typography>
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
