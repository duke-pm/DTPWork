import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import FormCustomAll from './FormCustomAll';

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
		marginTop: 30,
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
export default function PossessionAll(props) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const classes = useStyles(props);
	return (
		<>
			<FormCustomAll open={open} handleClose={handleClose} />
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
					<Button onClick={handleOpen} className="h-26" variant="contained" color="primary">
						{' '}
						<svg
							className="h-14 w-14"
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
					</Button>
				</div>
				<Paper className={classes.rootPaper}>
					<Table className={classes.table} stickyHeader aria-label="sticky table" size="large">
						<TableHead>
							<TableRow>
								<TableCell className="text-gray-800 font-sans w-screen" align="center">
									Mã sản phẩm
								</TableCell>
								<TableCell className="text-gray-800 font-sans w-screen" align="center">
									Tên sản phẩm
								</TableCell>
								<TableCell className="text-gray-800 font-sans  w-screen" align="center">
									Nhóm tài sản
								</TableCell>
								<TableCell className="text-gray-800 font-sans  w-screen" align="center">
									Ngày mua{' '}
								</TableCell>
								<TableCell className="text-gray-800 font-sans  w-screen" align="center">
									Nguyên giá
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="center"> MT-20020 </TableCell>
								<TableCell align="center"> Máy tính cá nhân </TableCell>
								<TableCell align="center">Thiết bị</TableCell>
								<TableCell align="center"> 02/04/2020 </TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		</>
	);
}
