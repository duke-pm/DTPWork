/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import * as moment from 'moment';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import image from '@fuse/assets/group.png';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';

const useStyles = makeStyles(theme => ({
	// InputSearch: {
	// 	width: '160px'
	// },
	tableHead: {
		height: 44
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
const chipColor = {
	1: 'bg-blue text-white',
	2: 'bg-green text-white',
	3: 'bg-orange text-black',
	4: 'bg-purple text-white',
	5: 'bg-green-700 text-white',
	6: 'bg-pink text-white'
};
const chipText = {
	1: 'Chưa sử dụng',
	2: 'Đang sử dụng',
	3: 'Sửa chữa-bảo hành',
	4: 'Hư hỏng',
	5: 'Mất ',
	6: 'Thanh lí'
};
export default function PossessionUnused(props) {
	const { value } = props;
	const possesionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage } = possesionContext;
	const [open, setOpen] = React.useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const dispatch = useDispatch();
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = () => {
		setOpen(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPage));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const classes = useStyles(props);
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<PossessionAll open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent handleOpenForm={handleOpenForm} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.table}`} stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="left"
											>
												Mã sản phẩm
											</TableCell>
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
												align="left"
											>
												Tên sản phẩm
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
											<TableCell
												className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans  w-screen"
												align="left"
											>
												Trạng thái
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{entities &&
											!lastErrors &&
											entities.map(items => (
												<TableRow key={items.assetID} hover className={classes.tableHead}>
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
