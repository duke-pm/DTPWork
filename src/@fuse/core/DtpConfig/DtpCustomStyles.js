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
		// [theme.breakpoints.up('lg')]: {
		// 	maxHeight: '460px'
		// },
		// [theme.breakpoints.up('xl')]: {
		// 	maxHeight: '580px'
		// }
	},
	Acitivity: {
		[theme.breakpoints.up('lg')]: {
			height: '470px'
		},
		[theme.breakpoints.up('xl')]: {
			height: '690px'
		}
	},
	containerGrantt: {
		position: 'relative',
		marginTop: 16
	},
	gantt: {
		position: 'absolute',
		width: '100%',
		height: 'auto'
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
	DrawerFormInput: {
		width: '700px',
		zIndex: 20
	},
	Drawer: {
		zIndex: '150 !important'
	},
	CustomFont: {
		lineHeight: 1.4,
		fontWeight: 'bold'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	},
	customHoverFocus: {
		backgroundColor: '#006565',
		float: 'left',
		color: '#fff',
		'&:hover, &.Mui-focusVisible': { backgroundColor: '#003737' }
	},
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
}));
export default DtpCustomStyles;
