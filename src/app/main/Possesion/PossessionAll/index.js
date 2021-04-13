import React from 'react';
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
	TablePagination
} from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent';
// import FormCustomAll from './FormCustomAll';

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
export default function PossessionUnused(props) {
	const [open, setOpen] = React.useState(false);
	const [rowPage, setRowPage] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = () => {
		setOpen(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const classes = useStyles(props);
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
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow hover className={classes.tableHead}>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell align="left"> MT-20020 </TableCell>
											<TableCell align="left"> abbott @withinpixels.com </TableCell>
											<TableCell align="left">Thiết bị</TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
											<TableCell align="left"> 02/04/2020 </TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Paper>
						</TableContainer>
						<Panigation
							page={page}
							handleChangePage={handleChangePage}
							rowPage={rowPage}
							handleChangeRowsPerPage={handleRowChange}
							count={20}
						/>
					</div>
				</FuseAnimate>
			</div>
		</>
	);
}
