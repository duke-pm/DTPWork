/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableContainer, Paper, TableRow } from '@material-ui/core';
import { Popover, Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import image from '@fuse/assets/group.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as moment from 'moment';
import FormCustomUnused from './FormCustomUnused';
import FormControlReport from '../FormControl/FormControlReport';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import PossessionAll from '../PossessionAll/FormCustomAll';
import TableHeaderUnUsed from './Component/TableHeaderUnUsed';
import PossesionActions from './Component/PossesionActions';
import { useStyles } from './StyleCustomAll';
import TableBodyUnUsed from './Component/TableBodyUnUsed';

function PossessionUnused(props) {
	const { value } = props;
	const [open, setOpen] = React.useState(false);
	const [editAssets, setEditAssets] = useState(false);
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const { rowPage, setRowPage, page, setPage, search } = possessionContext;
	const classes = useStyles(props);
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(1));
	}, [dispatch]);
	const handleClose = () => {
		setOpen(false);
		setEditAssets(false);
	};
	const handleOpenForm = items => {
		setOpen(true);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, page + 1, search));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, newPage + 1, search));
	};
	const handleOpenFormEdit = items => {
		setEditAssets(true);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<FormCustomUnused open={open} handleClose={handleClose} />
			<PossessionAll rowPage={rowPage} open={editAssets} handleClose={handleClose} />
			<FormControlReport />
			<div className="flex flex-col">
				<ActionComponent value={value} />
				<FuseAnimate delay={200} animation="transition.slideUpIn">
					<div className="flex flex-col mt-16 min-h-full  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderUnUsed />
									<TableBodyUnUsed
										handleOpenForm={handleOpenForm}
										handleOpenFormEdit={handleOpenFormEdit}
										entities={entities}
										lastErrors={lastErrors}
									/>
								</Table>
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
export default React.memo(PossessionUnused);
