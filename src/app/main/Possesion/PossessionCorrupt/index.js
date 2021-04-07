import React, { useContext } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';

// import FormCustomAll from './FormCustomAll';

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
export default function PossessionCorrupt(props) {
	const [open, setOpen] = React.useState(false);
	const possessionContext = useContext(PossessionContext);
	const { handleOpenFormCycle } = possessionContext;
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenFormCycleView = type => {
		handleOpenFormCycle(type);
	};
	const handleOpenForm = () => {
		setOpen(true);
	};
	const classes = useStyles(props);
	return (
		<>
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<div className="flex flex-row justify-between">
						<div className="flex flex-row justify-around">
							<TextField
								className={classes.InputSearch}
								id="standard-basic"
								label="Tìm kiếm"
								inputProps={{
									style: {
										height: '2px'
									}
								}}
								variant="outlined"
							/>
							<Button
								variant="contained"
								className="ml-16 font-sans h-26"
								color="primary"
								component="span"
							>
								Báo hỏng (0)
							</Button>
							<Button
								variant="contained"
								className="ml-16 font-sans h-26"
								color="secondary"
								component="span"
							>
								Báo mất(0)
							</Button>
						</div>
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

										<TableCell align="center" className="p-4 md:p-12">
											<div className="flex items-center">
												<Tooltip placement="topLeft" title="Xem chi tiết" aria-label="add">
													<IconButton onClick={handleOpenForm}>
														<Icon>info</Icon>
													</IconButton>
												</Tooltip>
												<Tooltip
													placement="topLeft"
													title="Đưa vào sử dụng lại"
													aria-label="add"
												>
													<IconButton onClick={() => handleOpenFormCycleView('repair')}>
														<Icon>autorenew</Icon>
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
