import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	Button,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer
} from '@material-ui/core';
import { Tooltip } from 'antd';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormCustomUsed from './FormCustomUsed';
import FormControlReport from '../FormControl/FormControlReport';
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
	const [open, setOpen] = React.useState(false);
	const [openFormReport, setOpenFormReport] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenForm = () => {
		setOpen(true);
	};
	const handleOpenFormReport = () => setOpenFormReport(true);
	const handleCloseFormReport = () => setOpenFormReport(false);
	const classes = useStyles(props);
	return (
		<>
			<FormCustomUsed open={open} handleClose={handleClose} />
			<FormControlReport open={openFormReport} handleClose={handleCloseFormReport} />
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<TextField
						className={classes.InputSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							)
						}}
						id="standard-basic"
						label="Tìm kiếm"
					/>
				</div>
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

										<TableCell align="center" className="p-4 md:p-12">
											<div className="flex items-center">
												<Tooltip placement="topLeft" title="Thu hồi tài sản" aria-label="add">
													<IconButton onClick={handleOpenForm}>
														<Icon>backspace</Icon>
													</IconButton>
												</Tooltip>
												<Tooltip placement="topLeft" title="Báo hỏng tài sản" aria-label="add">
													<IconButton onClick={handleOpenFormReport}>
														<Icon>build</Icon>
													</IconButton>
												</Tooltip>
												<Tooltip placement="topLeft" title="Báo mất tài sản" aria-label="add">
													<IconButton onClick={handleOpenFormReport}>
														<Icon>report_problem</Icon>
													</IconButton>
												</Tooltip>
											</div>
										</TableCell>
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
