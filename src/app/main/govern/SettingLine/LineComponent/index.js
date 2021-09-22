/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import TableProject from './TableLine';
import { SettingLineContext } from '../SettingLineContext';
import { fetchListLinesFilter, setTaskEditLine, deletedLine } from '../reduxSettingLine/LineSettingActions';

export default function LineComponent() {
	const dispatch = useDispatch();
	const history = useHistory();
	const lineContext = useContext(SettingLineContext);
	const { setPage, setRowPage, rowPage, page, search } = lineContext;
	const { currentState } = useSelector(
		state => ({
			currentState: state.govern.listLines
		}),
		shallowEqual
	);
	const { entities, listLoading, total_count, actionLoading } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchListLinesFilter(rowPage, newPage + 1, search));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchListLinesFilter(rowPageParse, page, search));
	};
	const setEditLine = item => {
		dispatch(setTaskEditLine(item));
		history.push(`/quan-tri/quyen/cap-nhat/${item.roleID}`);
	};
	const deleteItem = item => dispatch(deletedLine(item));
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col">
				<TableProject
					deleteItem={deleteItem}
					setEditLine={setEditLine}
					listLoading={listLoading}
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
