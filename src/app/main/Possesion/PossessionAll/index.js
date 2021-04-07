import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Button
} from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import PossessionAll from './FormCustomAll';

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
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<div className="flex flex-row justify-between">
						<TextField
							className="w-auto"
							inputProps={{
								style: {
									height: '2px'
								}
							}}
							id="standard-basic"
							label="Tìm kiếm"
							variant="outlined"
						/>
						<Button onClick={handleOpenForm} className="h-auto w-auto" variant="contained" color="primary">
							{' '}
							<svg
								className="h-10 w-10"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Thêm mới
						</Button>{' '}
					</div>
				</FuseAnimate>
				<div className="flex flex-col mt-36 min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
					<TableContainer className="flex flex-1">
						<Paper className={classes.rootPaper}>
							<Table className={classes.table} stickyHeader>
								<TableHead>
									<TableRow>
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
										/>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell align="center"> MT-20020 </TableCell>
										<TableCell align="center"> abbott @withinpixels.com </TableCell>
										<TableCell align="center">Thiết bị</TableCell>
										<TableCell align="center"> 02/04/2020 </TableCell>
										<TableCell align="center"> 02/04/2020 </TableCell>

										{/* <TableCell align="center" className="p-4 md:p-12">
											<div className="flex items-center">
												<Tooltip
													placement="topLeft"
													className=" font-sans"
													title="Thêm nhân viên vào tài sản"
													aria-label="add"
												>
													<IconButton onClick={handleOpenForm}>
														<Icon>add</Icon>
													</IconButton>
												</Tooltip>
												<Tooltip
													placement="topLeft"
													className=" font-sans"
													title="Báo hỏng tài sản"
													aria-label="add"
												>
													<IconButton onClick={() => handleFormOpenReport('service')}>
														<Icon>build</Icon>
													</IconButton>
												</Tooltip>
												<Tooltip
													placement="topLeft"
													className=" font-sans"
													title="Báo mất tài sản"
													aria-label="add"
												>
													<IconButton onClick={() => handleFormOpenReport('lose')}>
														<Icon>report_problem</Icon>
													</IconButton>
												</Tooltip>
											</div>
										</TableCell> */}
									</TableRow>
								</TableBody>
							</Table>
						</Paper>
					</TableContainer>
				</div>
			</div>
		</>
	);
}
