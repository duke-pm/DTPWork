import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import image from '@fuse/assets/group.png';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import SettingMenuContentHeader from './SettingMenuContentHeader';
import * as actions from '../../_redux/menuActions';
import SettingMenuContentBody from './SettingMenuContentBody';
import { useStyles } from '../../StyleCustomAll';
import { SettingmenuContext } from '../../SettingMenuContext';

export default function SettingMenuContent({ handleOpenSettingMenu }) {
	const dispatch = useDispatch();
	const settingContext = useContext(SettingmenuContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = settingContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, lastErrors, listloading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(actions.fetchsListMenuSettings());
		dispatch(actions.fetchsListMenuSettingAll());
	}, [dispatch]);
	const handleEditMenuSetting = item => {
		handleOpenSettingMenu();
		dispatch(actions.setTaskEditMenuSetting(item));
	};
	const handleDeleteMenuSetting = item => {
		console.log(item);
		dispatch(actions.deletedSettingsMenu(item));
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
	const classes = useStyles();
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.expandIn'
						}}
					>
						<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
							<SettingMenuContentHeader createSortHandler={createSortHandler} sort={sort} />
							<SettingMenuContentBody
								handleDeleteMenuSetting={handleDeleteMenuSetting}
								handleEditMenuSetting={handleEditMenuSetting}
								classes={classes}
								entities={entities}
								lastErrors={lastErrors}
							/>
						</Table>
						{entities === null || lastErrors ? (
							<div className="flex items-center justify-center h-auto">
								<img className="rounded-full mx-auto" src={image} alt="" width="484" height="512" />
							</div>
						) : null}
					</FuseAnimateGroup>
				</FuseScrollbars>
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
		</>
	);
}
