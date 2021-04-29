/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import image from '@fuse/assets/group.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as moment from 'moment';
import { Popover, Spin } from 'antd';
import * as actions from '../_redux/possesionActions';
import FormCustomUsed from './FormCustomUsed';
import FormControlReport from '../FormControl/FormControlReport';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionFliterComponent';
import FormRequest from './FormRequest';
import { rowPossesion } from './ConfigPossessionUsed';
import { useStyles } from './StyleCustomAll';
import TableHeaderUsed from './Component/TableHeaderUsed';
import TableBodyUsed from './Component/TableBodyUsed';

export default function PossessionUsed(props) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [formRequest, setFormRequest] = React.useState(false);
	const classes = useStyles(props);
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const { handleOpenFormReport, rowPage, setRowPage, page, setPage, search, value } = possessionContext;
	const handleOpenFormRequest = () => setFormRequest(true);
	const handleClose = () => setOpen(false);
	const handleCloseFormRequest = () => setFormRequest(false);
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(2));
	}, [dispatch]);
	const handleFormOpenReport = (type, items) => {
		dispatch(actions.setTaskEditPossesionAll(items));
		handleOpenFormReport(type);
	};
	const handleOpenForm = items => {
		dispatch(actions.setTaskEditPossesionAll(items));
		setOpen(true);
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
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<FormCustomUsed open={open} handleClose={handleClose} />
			<FormRequest open={formRequest} handleClose={handleCloseFormRequest} />
			<FormControlReport />
			<div className="flex flex-col">
				<ActionComponent handleOpenForm={handleOpenFormRequest} value={props.value} />
				<FuseAnimate delay={200} animation="transition.slideUpIn">
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderUsed />
									<TableBodyUsed
										entities={entities}
										handleOpenForm={handleOpenForm}
										handleFormOpenReport={handleFormOpenReport}
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
