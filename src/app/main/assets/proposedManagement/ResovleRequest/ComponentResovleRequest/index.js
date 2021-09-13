/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { ResovleContext } from '../ResovleRequestContext';
import * as action from '../../_redux/confirmAction';
import TableResovleRequest from './component/TableResource';

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
		setSort,
		setTimeLine,
		requestTypeId
	} = ResovleContextHandle;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, 0, true));
	}, [dispatch]);
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(
				status,
				rowPageParse,
				page,
				requestTypeId,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			action.searchConfirms(
				status,
				rowPage,
				newPage + 1,
				requestTypeId,
				sort.id,
				sort.direction,
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
	const handleOpenTimeLine = (title, item) => {
		setTimeLine({
			open: true,
			title
		});
		dispatch(action.timeLineApproval(item));
	};
	return (
		<>
			<div className="w-full flex flex-col">
				{/* <ActionComponent /> */}
				<div className="flex flex-col ">
					<TableResovleRequest entities={entities} listloading={listloading} />
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
				</div>
			</div>
		</>
	);
}
