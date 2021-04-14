/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
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
	ListItemText,
	Typography
} from '@material-ui/core';
import * as moment from 'moment';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AppsIcon from '@material-ui/icons/Apps';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';

const useStyles = makeStyles(theme => ({
	InputSearch: {
		width: '250px'
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
const chipColor = {
	4: 'bg-purple text-white',
	5: 'bg-green-700 text-white'
};
const chipText = {
	4: 'Hư hỏng',
	5: 'Mất'
};
export default function PossessionCorrupt(props) {
	const { value } = props;
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [actionMenu, setActionMenu] = React.useState(null);
	const [rowPage, setRowPage] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const possessionContext = useContext(PossessionContext);
	const { handleOpenFormCycle } = possessionContext;
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenFormCycleView = type => {
		setActionMenu(null);
		handleOpenFormCycle(type);
	};
	const handleOpenForm = () => {
		setActionMenu(null);
		setOpen(true);
	};
	const actionMenuClick = event => {
		setActionMenu(event.currentTarget);
	};

	const actionMenuClose = () => {
		setActionMenu(null);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPage));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1));
	};
	const classes = useStyles(props);
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={props.value} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className="flex flex-1">
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans"
												align="center"
											>
												<IconButton aria-label="delete">
													<AppsIcon />
												</IconButton>
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="center"
											>
												Mã sản phẩm
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="center"
											>
												Tên sản phẩm
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="center"
											>
												Nhóm tài sản
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="center"
											>
												Ngày mua{' '}
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="center"
											>
												Nguyên giá
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="center"
											>
												Trạng thái
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{entities &&
											entities.map(items => (
												<TableRow key={items.assetID}>
													<TableCell align="center" className="p-4 md:p-12">
														<IconButton onClick={actionMenuClick} aria-label="delete">
															<MenuIcon />
														</IconButton>
														<Popover
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
																	<Icon>info</Icon>
																</ListItemIcon>
																<ListItemText primary="Xem chi tiết" />
															</MenuItem>
															<MenuItem
																onClick={() => handleOpenFormCycleView('repair')}
																role="button"
															>
																<ListItemIcon className="min-w-40">
																	<Icon>autorenew</Icon>
																</ListItemIcon>
																<ListItemText primary="Đưa vào sử dụng lại" />
															</MenuItem>
														</Popover>
													</TableCell>
													<TableCell align="left">{items.assetName} </TableCell>
													<TableCell align="left">{items.groupName}</TableCell>
													<TableCell align="left">
														{moment(items.purchaseDate).format('DD-MM-YYYY')}{' '}
													</TableCell>
													<TableCell align="left">
														{' '}
														{currencyFormat(items.originalPrice)}{' '}
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
