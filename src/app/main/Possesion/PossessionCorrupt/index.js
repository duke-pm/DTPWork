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
	ListItemText
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AppsIcon from '@material-ui/icons/Apps';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';

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
	const [actionMenu, setActionMenu] = React.useState(null);
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
	const classes = useStyles(props);
	return (
		<>
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-36 min-h-full overflow-hidden">
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
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
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
											<TableCell align="center"> MT-20020 </TableCell>
											<TableCell align="center"> abbott @withinpixels.com </TableCell>
											<TableCell align="center">Thiết bị</TableCell>
											<TableCell align="center"> 02/04/2020 </TableCell>
											<TableCell align="center"> 02/04/2020 </TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Paper>
						</TableContainer>
					</div>
				</FuseAnimate>
			</div>
		</>
	);
}
