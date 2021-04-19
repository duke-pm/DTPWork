/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Popover,
	ListItemIcon,
	MenuItem,
	ListItemText,
	Paper
} from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import image from '@fuse/assets/group.png';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
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
	const [actionMenu, setActionMenu] = useState(null);
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const { rowPage, setRowPage, page, setPage, search } = possessionContext;
	const classes = useStyles(props);
	// const handleFormOpenReport = type => {
	// 	setActionMenu(null);
	// 	handleOpenFormReport(type);
	// };
	const handleClose = () => {
		setOpen(false);
		setEditAssets(false);
	};
	const handleOpenForm = () => {
		setActionMenu(null);
		setOpen(true);
	};

	const actionMenuClick = (event, items) => {
		const params = 'Employee,Department,Region';
		setActionMenu(event.currentTarget);
		dispatch(actions.getInformationCompany(params));
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const actionMenuClose = () => {
		setActionMenu(null);
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
		setActionMenu(null);
		setEditAssets(true);
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
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="left"
											>
												Mã tài sản
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="left"
											>
												Tên tài sản
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="left"
											>
												Nhóm tài sản
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="left"
											>
												Ngày mua{' '}
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="left"
											>
												Nguyên giá
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{entities &&
											!lastErrors &&
											entities.map(items => (
												<TableRow hover key={items.assetID}>
													<TableCell align="center" className="p-4 md:p-12">
														<MenuIcon
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
															<MenuItem onClick={handleOpenForm} role="button">
																<ListItemIcon className="min-w-40">
																	<Icon>add</Icon>
																</ListItemIcon>
																<ListItemText primary="Thêm nhân viên vào tài sản" />
															</MenuItem>
															{/* <MenuItem
																onClick={() => handleFormOpenReport('service')}
																role="button"
															>
																<ListItemIcon className="min-w-40">
																	<Icon>build</Icon>
																</ListItemIcon>
																<ListItemText primary="Báo hỏng tài sản" />
															</MenuItem> */}
															{/* <MenuItem
																onClick={() => handleFormOpenReport('lose')}
																role="button"
															>
																<ListItemIcon className="min-w-40">
																	<Icon>report_problem</Icon>
																</ListItemIcon>
																<ListItemText primary="Báo mất tài sản" />
															</MenuItem> */}
															<MenuItem onClick={handleOpenFormEdit} role="button">
																<ListItemIcon className="min-w-40">
																	<Icon>edit</Icon>
																</ListItemIcon>
																<ListItemText primary="Chỉnh sửa tài sản" />
															</MenuItem>
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
