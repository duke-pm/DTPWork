/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import { Spin } from 'antd';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent/ActionFilterComponent';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';
import TableBodyAssetAll from './Component/TableBody';
import { useStyles } from './StyleCustomAll';
import ProcessingUseAsset from './Component/ProcessingUseAsset';

function PossessionAllPage(props) {
	const { value } = props;
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const possesionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search, sort, setSort } = possesionContext;
	const [open, setOpen] = useState(false);
	const [openHistory, setOpenHistory] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const handleClose = React.useCallback(() => {
		setOpen(false);
	}, []);
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(0));
	}, [dispatch]);
	const handleOpenForm = () => {
		dispatch(actions.setTaskEditPossesionAll(null));
		setOpen(true);
	};
	const HandleOpenHistory = items => {
		setOpenHistory(true);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPageParse, 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<ProcessingUseAsset setOpenHistory={setOpenHistory} openHistory={openHistory} />
			<PossessionAll rowPage={rowPage} open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={value} handleOpenForm={handleOpenForm} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className="flex flex-1">
							<Paper className={classes.rootPaper}>
								<TableBodyAssetAll
									HandleOpenHistory={HandleOpenHistory}
									entities={entities}
									lastErrors={lastErrors}
									classes={classes}
								/>
								{(entities && entities.length === 0) || lastErrors ? (
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
									handleChangeRowsPerPage={handleRowChange}
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
export default PossessionAllPage;
