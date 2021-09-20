/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Table, TableContainer, Paper } from '@material-ui/core';
import { Empty, Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { useHistory } from 'react-router';
import FormCustomUnused from './FormCustomUnused';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import PossessionAll from '../PossessionAll/FormCustomAll';
import TableHeaderUnUsed from './Component/TableHeaderUnUsed';
import TableBodyUnUsed from './Component/TableBodyUnUsed';
import TableAssetUnUsed from './Component/TableAssetUnUsed';

function PossessionUnused(props) {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, total_count, actionLoading } = currentState;
	const { rowPage, setRowPage, page, setPage, search, sort, setSort } = possessionContext;
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(1));
	}, [dispatch]);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = items => {
		setOpen(true);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(1, rowPage, page + 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(1, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const handleOpenFormEdit = items => {
		dispatch(actions.setTaskEditPossesionAll(items));
		history.push('/tai-san/quan-ly-tai-san/modify?type=chinh-sua');
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(1, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<>
			<FormCustomUnused open={open} handleClose={handleClose} />
			<div className="flex flex-col table--tab">
				{/* <ActionComponent entities={entities} value={value} /> */}
				<div className="flex flex-col ">
					<TableAssetUnUsed
						handleOpenFormEdit={handleOpenFormEdit}
						handleOpenForm={handleOpenForm}
						createSortHandler={createSortHandler}
						entities={entities}
						listLoading={listloading}
					/>
					{entities?.length !== 0 && (
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
export default React.memo(PossessionUnused);
