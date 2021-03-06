/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableAssetPay from './Component/TableAssetPay';

export default function PossessionPay(props) {
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search, sort, setSort } = possessionContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, total_count } = currentState;

	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(6, rowPageParse, 1, search, sort.id, sort.direction));
	};
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(6));
	}, [dispatch]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(6, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(6, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<>
			{/* <FormCustomRepair open={open} handleClose={handleClose} /> */}
			<div className="flex flex-col table--tab">
				{/* <ActionComponent value={value} /> */}

				<div className="flex flex-col">
					<TableAssetPay
						createSortHandler={createSortHandler}
						entities={entities}
						listLoading={listloading}
					/>
					{entities?.length !== 0 && (
						<Panigation
							page={page}
							handleChangePage={handleChangePage}
							rowPage={rowPage}
							handleChangeRowsPerPage={handleRowChange}
							count={total_count}
						/>
					)}
				</div>
			</div>
		</>
	);
}
