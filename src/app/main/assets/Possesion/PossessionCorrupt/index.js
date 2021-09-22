/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableAssetCorrupt from './Component/TableAssetCorrupt';

export default function PossessionCorrupt(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, total_count } = currentState;
	const possessionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search, setFormService, sort, setSort } = possessionContext;
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenFormLiquiAsset = item => {
		history.push('/tai-san/quan-ly-tai-san/thanh-ly?type=damage');
		dispatch(actions.setTaskEditPossesionAll(item));
	};
	const handleOpenFormService = item => {
		setFormService(true);
		history.push('/tai-san/quan-ly-tai-san/sua-chua-bao-hanh?type=damage');
		dispatch(actions.setTaskEditPossesionAll(item));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(4, rowPageParse, 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(4, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(4, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(4));
	}, [dispatch]);
	return (
		<>
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col table--tab">
				<div className="flex flex-col">
					<TableAssetCorrupt
						handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
						handleOpenFormService={handleOpenFormService}
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
