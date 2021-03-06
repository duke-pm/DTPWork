import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	tabrow: {
		'& > *': {
			borderBottom: 'unset'
		}
	},
	tableRowExpand: {
		paddingBottom: 0,
		paddingTop: 0
	},
	tableHead: {
		backgroundColor: 'red'
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
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	},
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
export { useStyles };
