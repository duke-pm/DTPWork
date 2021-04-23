/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Popover,
	MenuItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import * as moment from 'moment';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';
import { chipColor, chipText, rowPossesion } from './ConfigPossessionAll';

const useStyles = makeStyles(theme => ({
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 1540,
		overflowX: 'auto'
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

export default function PossessionUnused(props) {
	const { value } = props;
	const possesionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search } = possesionContext;
	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [actionMenu, setActionMenu] = useState(null);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = items => {
		setActionMenu(null);
		const params = 'Supplier,Company,AssetType,AssetGroup,AssetGroupDetail,Department';
		dispatch(actions.getInformationCompany(params));
		dispatch(actions.setTaskEditPossesionAll(null));
		setOpen(true);
	};
	const handleOpenFormEdit = items => {
		setActionMenu(null);
		setOpen(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPageParse, 1, search));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, newPage + 1, search));
	};
	const actionMenuClick = (event, items) => {
		const params = 'Supplier';
		dispatch(actions.getInformationCompany(params));
		setActionMenu(event.currentTarget);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const actionMenuClose = () => {
		setActionMenu(null);
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}
		setOrder({
			direction,
			id
		});
	};
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<PossessionAll rowPage={rowPage} open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={value} handleOpenForm={handleOpenForm} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.table}`} stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans"
												align="left"
											>
												<IconButton aria-label="delete">
													<AppsIcon />
												</IconButton>
											</TableCell>
											{rowPossesion.map(row => (
												<TableCell
													className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
													align={row.align}
												>
													{row.sort ? (
														<TableSortLabel
															active={order.id === row.id}
															direction={order.direction}
															onClick={createSortHandler(row.id)}
														>
															{row.label}
														</TableSortLabel>
													) : (
														row.label
													)}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{entities &&
											!lastErrors &&
											entities.map(items => (
												<TableRow key={items.assetID} hover className={classes.tableHead}>
													<TableCell align="center" className="p-4 md:p-12">
														<MoreVertIcon
															className="cursor-pointer"
															onClick={event => actionMenuClick(event, items)}
															aria-label="delete"
														/>
														<Popover
															elevation={1}
															open={Boolean(actionMenu)}
															anchorEl={actionMenu}
															onClose={actionMenuClose}
															anchorOrigin={{
																vertical: 'center',
																horizontal: 'right'
															}}
															transformOrigin={{
																vertical: 'top',
																horizontal: 'left'
															}}
														>
															<MenuItem onClick={handleOpenFormEdit} role="button">
																<ListItemIcon className="min-w-40">
																	<Icon>edit</Icon>
																</ListItemIcon>
																<ListItemText primary="Chỉnh sửa" />
															</MenuItem>
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
														{items && items.empName ? items.empName : null}
													</TableCell>
													<TableCell align="left">
														<div
															className={`inline text-12 p-4 rounded-full truncate ${
																chipColor[items.statusID]
															}`}
														>
															{chipText[items.statusID]}
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
