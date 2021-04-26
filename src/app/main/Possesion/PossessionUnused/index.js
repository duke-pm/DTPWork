/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableBody, TableContainer, Paper, TableRow } from '@material-ui/core';
import { Popover } from 'antd';
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
// import FormCustomAll from './FormCustomAll';

const useStyles = makeStyles(theme => ({
	InputSearch: {
		width: '200px'
	},
	table: {
		minWidth: 800
	},
	TableContainer: {
		maxHeight: '600px'
	},
	cellTabel: {
		width: 340
	},
	rootPaper: {
		width: '100%',
		overflowX: 'auto'
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
export default function PossessionUnused(props) {
	const { value } = props;
	const [open, setOpen] = React.useState(false);
	const [editAssets, setEditAssets] = useState(false);
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const { rowPage, setRowPage, page, setPage, search } = possessionContext;
	const classes = useStyles(props);
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
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
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
									<TableBody>
										{entities &&
											!lastErrors &&
											entities.map(items => (
												<TableRow hover key={items.assetID}>
													<TableCell align="center" className="p-4 md:p-12">
														<Popover
															placement="rightTop"
															content={() => (
																<PossesionActions
																	handleOpenForm={handleOpenForm}
																	items={items}
																	handleOpenFormEdit={handleOpenFormEdit}
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
													<TableCell align="left">
														{' '}
														{currencyFormat(items.originalPrice)}{' '}
													</TableCell>
													<TableCell align="left">{items.deptNameManager}</TableCell>
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
