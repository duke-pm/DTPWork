/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import { ResovleContext } from '../ResovleRequestContext';
import * as action from '../../_redux/confirmAction';
import TableResovleRequest from './component/TableResource';

export default function RequestResovelTable(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const ResovleContextHandle = useContext(ResovleContext);
	const { setPage, status, page, rowPage, setRowPage, search, dateStart, dateEnd, sort, setTimeLine, requestTypeId } =
		ResovleContextHandle;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, total_count, actionLoading } = currentState;
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
	const handleOpenDialog = (type, data) => {
		switch (type) {
			case 'allocation':
				history.push(`/tai-san/de-xuat-can-xu-ly-cho-phep`);
				dispatch(action.fetchDataConfirm(data));
				break;
			case 'damage':
				history.push(`/tai-san/de-xuat-can-xu-ly/damage`);
				dispatch(action.fetchDataConfirm(data));
				break;
			case 'lost':
				history.push(`/tai-san/de-xuat-can-xu-ly/lost`);
				dispatch(action.fetchDataConfirm(data));
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
					<TableResovleRequest
						handleOpenTimeLine={handleOpenTimeLine}
						handleOpenDialog={handleOpenDialog}
						entities={entities}
						listloading={listloading}
					/>
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
