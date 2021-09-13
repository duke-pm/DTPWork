import React, { useEffect, useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import * as actions from '../../_redux/menuActions';
import { SettingmenuContext } from '../../SettingMenuContext';
import TableSettingMenu from '../Component';

export default function SettingMenuContent() {
	const dispatch = useDispatch();
	const history = useHistory();
	const settingContext = useContext(SettingmenuContext);
	const { page, rowPage, setPage, sort, setRowPage } = settingContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(actions.fetchsListMenuSettings());
	}, [dispatch]);
	const handleEditMenuSetting = item => {
		history.push(`/quan-tri/thiet-lap-menu/cap-nhat/${item.menuID}`);
		dispatch(actions.setTaskEditMenuSetting(item));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchsListMenuSettingParams(rowPage, newPage + 1, sort.direction, sort.id));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(actions.fetchsListMenuSettingParams(rowPageParse, page, sort.direction, sort.id));
	};
	return (
		<>
			<div className="w-full flex flex-col">
				<div className="flex flex-col ">
					<TableSettingMenu
						listLoading={listLoading}
						actionLoading={actionLoading}
						entities={entities}
						handleEditMenuSetting={handleEditMenuSetting}
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
		</>
	);
}
