import { Badge, Drawer } from 'antd';
import React, { useContext, useState } from 'react';
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import { shallowEqual, useSelector } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';
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
			{value === index && <Box p={1}>{children}</Box>}
		</div>
	);
}
const useStyles = makeStyles(theme => ({
	toolbar: {
		height: 64,
		minHeight: 64,
		display: 'flex',
		alignItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`
	}
}));
export default function DrawerComponent() {
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
		<div className="site-drawer-render-in-current-wrapper">
			<Drawer
				width={580}
				placement="right"
				closeIcon={<CloseOutlined />}
				closable
				onClose={closeVisible}
				visible={visible}
				getContainer={false}
				style={{ position: 'absolute', display: !visible && 'none' }}
			>
				<div className={classes.toolbar}>
					<Tabs
						classes={{ root: 'w-full h-64' }}
						value={tab}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
					>
						<Tab className="font-sans" label="Overview" {...a11yProps(0)} />
						<Tab
							className="font-sans"
							label={
								<Badge
									offset={[14]}
									count={
										entitiesView && entitiesView.activities ? entitiesView.activities.length : null
									}
									className="site-badge-count-4"
								>
									{' '}
									Activity{' '}
								</Badge>
							}
							{...a11yProps(1)}
						/>
						<Tab
							className="font-sans"
							label={
								<Badge
									offset={[14]}
									count={entitiesView && entitiesView.watcher ? entitiesView.watcher.length : null}
									className="site-badge-count-4"
								>
									{' '}
									Watchers{' '}
								</Badge>
							}
							{...a11yProps(2)}
						/>{' '}
					</Tabs>
				</div>
				<div>
					<TabPanel value={tab} index={0}>
						<DrawerOverView closeVisible={closeVisible} />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<DrawerActivity />
					</TabPanel>
					<TabPanel value={tab} index={2}>
						<DrawerWatchers />
					</TabPanel>
				</div>
			</Drawer>
		</div>
	);
}
