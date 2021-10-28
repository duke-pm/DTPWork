/* eslint-disable no-shadow */
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import React, { useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import TableProject from './TableLevelApproval';
import { LevelApprovalContext } from '../LevelApprovalContext';
import { setTaskEditLevel, deletedLevel, fetchListLevelsFilter } from '../reduxSettingLevel/LevelSettingActions';

export default function LevelApprovalComponent() {
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const levelApprovalContext = useContext(LevelApprovalContext);
	const { setPage, setRowPage, rowPage, page, search } = levelApprovalContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.listLevel }), shallowEqual);
	const { listLoading, actionLoading, entities, total_count } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchListLevelsFilter(rowPage, newPage + 1, search));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchListLevelsFilter(rowPageParse, page, search));
	};
	const setTaskEdit = item => {
		history.push(`/quan-tri/cap-quyen/cap-nhat`);
		dispatch(setTaskEditLevel(item));
	};
	const deleteLevel = items => {
		dispatch(deletedLevel(items));
	};
	return (
		<div className="w-full flex flex-col">
			{/* <ActionLineComponent classes={classes} /> */}
			<div className="flex flex-col ">
				<TableProject
					deleteLevel={deleteLevel}
					setTaskEdit={setTaskEdit}
					listLoading={listLoading}
					classes={classes}
					entities={entities}
				/>
				{entities && entities.length !== 0 && (
					<div className="flex flex-row items-center justify-end">
						{actionLoading && <Spin />}
						<Panigation
							page={page}
							handleChangePage={handleChangePage}
							rowPage={rowPage}
							handleChangeRowsPerPage={handleRowPage}
							count={total_count}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
