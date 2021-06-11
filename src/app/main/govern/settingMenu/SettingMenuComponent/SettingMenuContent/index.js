import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import image from '@fuse/assets/group.png';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import FuseAnimate from '@fuse/core/FuseAnimate';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import SettingMenuContentHeader from './SettingMenuContentHeader';
import * as actions from '../../_redux/menuActions';
import SettingMenuContentBody from './SettingMenuContentBody';
import { SettingmenuContext } from '../../SettingMenuContext';
import SettingMenuHeader from '../SettingMenuHeader';

export default function SettingMenuContent({ handleOpenSettingMenu, setOpenSettingMenu }) {
	const dispatch = useDispatch();
	const settingContext = useContext(SettingmenuContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = settingContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, lastErrors, listLoading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(actions.fetchsListMenuSettings());
		dispatch(actions.fetchsListMenuSettingAll());
	}, [dispatch]);
	const handleEditMenuSetting = item => {
		setOpenSettingMenu(true);
		dispatch(actions.setTaskEditMenuSetting(item));
	};
	const handleDeleteMenuSetting = item => {
		dispatch(actions.deletedSettingsMenu(item));
		dispatch(actions.fetchsListMenuSettingAll());
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
	const classes = DtpCustomStyles();
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<>
			<div className="w-full flex flex-col">
				<SettingMenuHeader handleOpenSettingMenu={handleOpenSettingMenu} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.tableGoverSetting}`} stickyHeader>
									<SettingMenuContentHeader createSortHandler={createSortHandler} sort={sort} />
									<SettingMenuContentBody
										handleDeleteMenuSetting={handleDeleteMenuSetting}
										handleEditMenuSetting={handleEditMenuSetting}
										classes={classes}
										entities={entities}
										lastErrors={lastErrors}
									/>
								</Table>
								{!entities || entities.length === 0 ? (
									<FuseAnimate delay={300}>
										<div className="flex items-center justify-center h-auto">
											<img
												className="rounded-full mx-auto"
												src={image}
												alt=""
												width="384"
												height="512"
											/>
										</div>
									</FuseAnimate>
								) : null}
							</Paper>
						</TableContainer>
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
