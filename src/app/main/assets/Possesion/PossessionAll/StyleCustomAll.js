import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 2040,
		overflowX: 'auto'
	},
	tableHistroy: {
		minWidth: 1504,
		overflowX: 'auto'
	},
	tableHistoryNoData: {
		minWidth: 0,
		overflowX: 'auto'
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
export { useStyles };
