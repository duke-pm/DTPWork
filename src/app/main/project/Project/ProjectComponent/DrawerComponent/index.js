import { Badge, Drawer } from 'antd';
import React, { useContext, useState } from 'react';
import { Tabs, Tab, Box, Typography, makeStyles } from '@material-ui/core';
import { ProjectContext } from '../../ProjectContext';
import DrawerActivity from './DrawerActivity';
import DrawerRelations from './DrawerRelations';
import DrawerWatchers from './DrawerWatchers';

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
	const projectContext = useContext(ProjectContext);
	const { visible, setVisible } = projectContext;
	const closeVisible = () => setVisible(false);
	const [tab, setTabs] = useState(0);
	const classes = useStyles();
	const handleChange = (event, newValue) => setTabs(newValue);
	return (
		<div className="site-drawer-render-in-current-wrapper">
			<Drawer
				width={580}
				placement="right"
				closable={false}
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
						<Tab className="font-sans" label="ACTIVITY" {...a11yProps(0)} />
						<Tab
							className="font-sans"
							label={
								<Badge offset={[14]} count="4" className="site-badge-count-4">
									{' '}
									Relation{' '}
								</Badge>
							}
							{...a11yProps(0)}
						/>
						<Tab
							className="font-sans"
							label={
								<Badge offset={[14]} count="4" className="site-badge-count-4">
									{' '}
									Watchers{' '}
								</Badge>
							}
							{...a11yProps(0)}
						/>{' '}
					</Tabs>
				</div>
				<div>
					<TabPanel value={tab} index={0}>
						<DrawerActivity />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<DrawerRelations />
					</TabPanel>
					<TabPanel value={tab} index={2}>
						<DrawerWatchers />
					</TabPanel>
				</div>
			</Drawer>
		</div>
	);
}
