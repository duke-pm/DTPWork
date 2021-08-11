import { IconButton, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import ExportToExcel from '@fuse/core/DtpConfig/ExportToExcel';
import * as actions from '../../_redux/possesionActions';
import { PossessionContext } from '../../PossessionContext';

const useStyles = makeStyles(theme => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}));

function ActionComponent(props) {
	const classes = useStyles();
	const { value } = props;
	const dispatch = useDispatch();
	const possesionConext = useContext(PossessionContext);
	const { search, setSearch, rowPage, page, setPage, sort } = possesionConext;
	const handleSearch = () => {
		setPage(0);
		dispatch(actions.searchPossesion(value, search, rowPage, page, sort.id, sort.direction));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			setPage(0);
			dispatch(actions.searchPossesion(value, e.target.value, rowPage, page, sort.id, sort.direction));
		}
	};
	// const exportExcel = () => {
	// 	dispatch(actions.exportToExcel());
	// };
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex sm:flex-row flex-col-reverse justify-end">
				{/* <Button onClick={exportExcel}> Xuất excel </Button> */}
				{/* <ExportToExcel entities={entities} /> */}
				<Paper className="flex justify-between">
					<InputBase
						onKeyPress={event => {
							if (event.key === 'Enter') {
								handleSearch();
							}
						}}
						onChange={e => onHandleChange(e)}
						className={classes.input}
						value={search}
						placeholder="Tìm kiếm"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton onClick={handleSearch} type="button" className={classes.iconButton} aria-label="search">
						<SearchIcon />
					</IconButton>
					{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
				</Paper>
			</div>
		</FuseAnimate>
	);
}
export default React.memo(ActionComponent);
