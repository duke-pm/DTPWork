import { Badge } from 'antd';
import React, { useContext, useState } from 'react';
import { Tabs, Tab, Box, makeStyles, Drawer, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { shallowEqual, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { ProjectContext } from '../../ProjectContext';
import DrawerActivity from './DrawerActivity';
import DrawerWatchers from './DrawerWatchers';
import DrawerOverView from './DrawerOverView';

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`
	};
}
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			// id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}
const useStyles = makeStyles(theme => ({
	toolbar: {
		height: 56,
		minHeight: 56,
		display: 'flex',
		alignItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	DrawerFormInput: {
		width: '660px',
		[theme.breakpoints.down('sm')]: {
			width: '400px'
		}
	},
	Drawer: {
		zIndex: '150 !important'
	}
}));
export default function DrawerComponent({ ArrProjectStatus }) {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const projectContext = useContext(ProjectContext);
	const { visible, setVisible } = projectContext;
	const closeVisible = () => {
		setVisible(false);
		setTabs(0);
	};
	const [tab, setTabs] = useState(0);
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setTabs(newValue);
	};
	return (
		<Drawer
			anchor="right"
			onClose={closeVisible}
			open={visible}
			className={classes.Drawer}
			classes={{ paper: classes.DrawerFormInput }}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={closeVisible} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Overview
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar}>
				<Tabs
					classes={{ root: 'flex w-full h-56' }}
					value={tab}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					scrollButtons="auto"
				>
					<Tab
						className="sm:w-auto w-full"
						label={
							<Badge offset={[14]} count={null} className="site-badge-count-4 ">
								<Typography variant="body1">Overview</Typography>
							</Badge>
						}
						{...a11yProps(0)}
					/>
					<Tab
						className="sm:w-auto w-full"
						label={
							<Badge
								offset={[14]}
								count={entitiesView && entitiesView.activities ? entitiesView.activities.length : null}
								className="site-badge-count-4 "
							>
								<Typography variant="body1">Activity</Typography>
							</Badge>
						}
						{...a11yProps(1)}
					/>
					<Tab
						className="sm:w-auto w-full"
						label={
							<Badge
								offset={[14]}
								count={entitiesView && entitiesView.watcher ? entitiesView.watcher.length : null}
								className="site-badge-count-4"
							>
								<Typography variant="body1">Watchers</Typography>
							</Badge>
						}
						{...a11yProps(2)}
					/>{' '}
				</Tabs>
			</div>
			<div className="overflow-scroll">
				<TabPanel value={tab} index={0}>
					<DrawerOverView ArrProjectStatus={ArrProjectStatus} closeVisible={closeVisible} />
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<DrawerActivity />
				</TabPanel>
				<TabPanel value={tab} index={2}>
					<DrawerWatchers />
				</TabPanel>
			</div>
		</Drawer>
	);
}
