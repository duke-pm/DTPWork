import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PossessionAll from './PossessionAll';
import PossessionUnused from './PossessionUnused';
import PossessionUsed from './PossessionUsed';
import PossessionRepair from './PossessionRepair';
import PossessionCorrupt from './PossessionCorrupt';
import PossessionLose from './PossessionLose';
import PossessionPay from './PossessionPay';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));
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
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function PossesionPage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	const [value, setValue] = React.useState(4);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<div className="container mx-auto ">
				<AppBar className="bg-white mt-16" position="static">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
					>
						<Tab className="text-gray-800 font-sans" label="Tất cả ( )" {...a11yProps(0)} />
						<Tab className="text-gray-800 font-sans	" label="Chưa sử dụng ( )" {...a11yProps(1)} />
						<Tab className="text-gray-800 font-sans	" label="Đang sử dụng( )" {...a11yProps(2)} />
						<Tab className="text-gray-800 font-sans	" label="Sửa chữa - bảo hành( )" {...a11yProps(3)} />
						<Tab className="text-gray-800 font-sans	" label="Hư hỏng - Mất" {...a11yProps(4)} />
						<Tab className="text-gray-800 font-sans	" label="Thanh lí( )" {...a11yProps(5)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<PossessionAll />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<PossessionUnused />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<PossessionUsed />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<PossessionRepair />
				</TabPanel>
				<TabPanel value={value} index={4}>
					<PossessionCorrupt />
				</TabPanel>
				<TabPanel value={value} index={5}>
					<PossessionPay />
				</TabPanel>
			</div>
		</div>
	);
}

export default PossesionPage;
