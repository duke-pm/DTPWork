/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { Table } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import { Spin } from 'antd';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import HeaderTableResovleRequest from './HeaderTableResovleRequest';
import { ResovleContext } from '../ResovleRequestContext';
import * as action from '../../_redux/confirmAction';
import BodyTableResovle from './BodyTableAllocation';
import { useStyles } from './StyleCustomAll';

export default function RequestResovelTable(props) {
	const dispatch = useDispatch();
	const ResovleContextHandle = useContext(ResovleContext);
	const {
		setDialogAllocation,
		setDialogCorrupt,
		setTypeDialogCorrupt,
		setPage,
		status,
		page,
		rowPage,
		setRowPage,
		search,
		dateStart,
		dateEnd,
		sort,
		setSort
	} = ResovleContextHandle;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const classes = useStyles(props);
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, rowPage, page, search, dateStart, dateEnd, 0, true));
	}, [dispatch]);
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(status, rowPageParse, page, 1, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			action.searchConfirms(
				status,
				rowPage,
				newPage + 1,
				1,
				sort.id,
				sort.direction,
				search,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(action.searchConfirms(status, rowPage, page, 1, id, direction, search, dateStart, dateEnd));
		setSort({
			direction,
			id
		});
	};
	const handleOpenDialog = (type, data) => {
		switch (type) {
			case 'allocation':
				setDialogAllocation(true);
				dispatch(action.fetchDataConfirm(data));
				break;
			case 'damage':
				setDialogCorrupt(true);
				dispatch(action.fetchDataConfirm(data));
				setTypeDialogCorrupt('damage');
				break;
			case 'lost':
				setDialogCorrupt(true);
				dispatch(action.fetchDataConfirm(data));
				setTypeDialogCorrupt('lost');
				break;
			default:
				return false;
		}
	};
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
							<HeaderTableResovleRequest createSortHandler={createSortHandler} sort={sort} />
							<BodyTableResovle
								handleOpenDialog={handleOpenDialog}
								classes={classes}
								entities={entities}
								lastErrors={lastErrors}
							/>
						</Table>
						{(entities && entities.length === 0) || lastErrors ? (
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
							handleChangeRowsPerPage={handleRowChange}
							count={total_count}
						/>
					</div>
				)}
				{/* </FuseAnimate> */}
			</div>
		</>
	);
}
