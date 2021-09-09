import React, { useEffect, useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Spin } from 'antd';
import * as actions from '../../_redux/menuActions';
import { SettingmenuContext } from '../../SettingMenuContext';
import TableSettingMenu from '../Component';

export default function SettingMenuContent({ handleOpenSettingMenu, setOpenSettingMenu }) {
	const dispatch = useDispatch();
	const settingContext = useContext(SettingmenuContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = settingContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(actions.fetchsListMenuSettings());
		dispatch(actions.fetchsListMenuSettingAll());
	}, [dispatch]);
	const handleEditMenuSetting = item => {
		setOpenSettingMenu(true);
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
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.fetchsListMenuSettingParams(rowPage, page, direction, id));
		setSort({
			direction,
			id
		});
	};
	return (
		<>
			<div className="w-full flex flex-col">
				{/* <SettingMenuHeader handleOpenSettingMenu={handleOpenSettingMenu} /> */}
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col ">
						<TableSettingMenu
							listLoading={listLoading}
							actionLoading={actionLoading}
							entities={entities}
							createSortHandler={createSortHandler}
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
				</FuseAnimate>
			</div>
		</>
	);
}
