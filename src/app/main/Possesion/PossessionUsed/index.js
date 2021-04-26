/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import image from '@fuse/assets/group.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as moment from 'moment';
import { Popover } from 'antd';
import * as actions from '../_redux/possesionActions';
import FormCustomUsed from './FormCustomUsed';
import FormControlReport from '../FormControl/FormControlReport';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import FormRequest from './FormRequest';
import { rowPossesion } from './ConfigPossessionUsed';
import { PossesionAction } from './PossessionAction';

// import FormCustomUnused from './FormCustomUnused';

// import FormCustomAll from './FormCustomAll';

const useStyles = makeStyles(theme => ({
	InputSearch: {
		width: '200px'
	},
	table: {
		minWidth: 800
	},
	cellTabel: {
		width: 340
	},
	rootPaper: {
		width: '100%',
		overflowX: 'auto'
	},
	TableContainer: {
		maxHeight: '600px'
	},
	modal: {
		display: 'flex',
		alignItems: 'start',
		marginTop: 80,
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	}
}));
export default function PossessionUsed(props) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [formRequest, setFormRequest] = React.useState(false);
	const classes = useStyles(props);
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;

	const { handleOpenFormReport, rowPage, setRowPage, page, setPage, search } = possessionContext;
	const handleOpenFormRequest = () => {
		setFormRequest(true);
	};
	const handleCloseFormRequest = () => {
		setFormRequest(false);
	};
	const handleFormOpenReport = (type, items) => {
		dispatch(actions.setTaskEditPossesionAll(items));
		handleOpenFormReport(type);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = items => {
		dispatch(actions.setTaskEditPossesionAll(items));
		setOpen(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
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
									<TableHead>
										<TableRow>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans "
												align="left"
											>
												<AppsIcon />
											</TableCell>
											{rowPossesion.map(row => (
												<TableCell
													key={row.id}
													className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
													align={row.align}
												>
													{row.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{entities &&
											entities.map(items => (
												<TableRow key={items.assetID} hover>
													<TableCell align="left" className="p-4 md:p-12">
														<Popover
															placement="rightTop"
															content={() => (
																<PossesionAction
																	handleOpenForm={handleOpenForm}
																	items={items}
																	handleFormOpenReport={handleFormOpenReport}
																/>
															)}
															title="Hành động"
														>
															<MoreVertIcon className="cursor-pointer" />
														</Popover>
													</TableCell>
													<TableCell align="left"> {items.assetCode} </TableCell>
													<TableCell align="left">{items.assetName} </TableCell>
													<TableCell align="left">{items.groupName}</TableCell>
													<TableCell align="left">
														{moment(items.purchaseDate).format('DD-MM-YYYY')}{' '}
													</TableCell>
													<TableCell align="left">{items.deptNameManager}</TableCell>
													<TableCell align="left">
														{' '}
														{items && items.empName ? items.empName : null}
													</TableCell>
													<TableCell align="left">
														<div
															className={`inline text-12 p-4 rounded-full truncate ${
																items.isProcessing
																	? items.requestTypeName === 'Đã báo hỏng'
																		? 'bg-purple text-white'
																		: 'bg-red-700 text-white'
																	: 'bg-green text-white'
															}`}
														>
															{items.isProcessing
																? items.requestTypeName
																: 'Đang sử dụng'}
														</div>
													</TableCell>
												</TableRow>
											))}
									</TableBody>
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
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowChange}
								count={total_count}
							/>
						)}
					</div>
				</FuseAnimate>
			</div>
		</>
	);
}
