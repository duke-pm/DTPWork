import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent';
// import FormCustomAll from './FormCustomAll';

const useStyles = makeStyles(theme => ({
	// InputSearch: {
	// 	width: '160px'
	// },
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
export default function PossessionUnused(props) {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = () => {
		setOpen(true);
	};
	const classes = useStyles(props);
	return (
		<>
			<PossessionAll open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent handleOpenForm={handleOpenForm} />
				<div className="flex flex-col mt-36 min-h-full overflow-hidden">
					<TableContainer className="flex flex-1">
						<Paper className={classes.rootPaper}>
							<FuseAnimate delay={200} animation="transition.slideUpIn">
								<Table className={classes.table} stickyHeader>
									<TableHead>
										<TableRow className="h-64 cursor-pointer" hover>
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
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow className="h-64 cursor-pointer" hover>
											<TableCell align="center"> abbott @withinpixels.com </TableCell>
											<TableCell align="center">Thiết bị</TableCell>
											<TableCell align="center"> 02/04/2020 </TableCell>
											<TableCell align="center"> 02/04/2020 </TableCell>
											<TableCell align="center"> 02/04/2020 </TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</FuseAnimate>
						</Paper>
					</TableContainer>
				</div>
			</div>
		</>
	);
}
