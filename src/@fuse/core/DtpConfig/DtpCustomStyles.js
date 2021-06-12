import { makeStyles } from '@material-ui/core/styles';

const DtpCustomStyles = makeStyles(theme => ({
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
	},
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 2040,
		overflowX: 'auto'
	},
	tablePay: {
		minWidth: 1400,
		overflowX: 'auto'
	},
	tableGoverListUser: {
		minWidth: 1000,
		overflowX: 'auto'
	},
	tableGoverSetting: {
		minWidth: 1000,
		overflowX: 'auto'
	},
	tableGoverGroup: {
		minWidth: 1000,
		overflowX: 'auto'
	},
	tableGoverListUserCell: {
		width: 120
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
		maxHeight: '420px'
	},
	modal: {
		display: 'flex',
		alignItems: 'start',
		marginTop: 80,
		justifyContent: 'center'
	},
	widthFont: {
		width: '13rem'
	},
	widthContent: {
		width: '60%'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	},
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
}));
export default DtpCustomStyles;
