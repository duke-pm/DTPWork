import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 1340,
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
		maxHeight: '410px'
	},
	modal: {
		display: 'flex',
		alignItems: 'start',
		marginTop: 80,
		justifyContent: 'center'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	}
}));
export { useStyles };
