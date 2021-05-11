import { AppBar, Box, Dialog, IconButton, Tab, Tabs, Toolbar, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import InformationProceeUseAsset from './InformationProceeUseAsset';
import TableProcessingUseAsset from './TableProcessingUseAsset';

const useStyles = makeStyles({
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
});

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

export default function ProcessingUseAsset({ openHistory, setOpenHistory }) {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const { entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit
		}),
		shallowEqual
	);
	const classes = useStyles();
	const handleClose = () => setOpenHistory(false);
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			classes={{ scrollPaper: classes.scrollPaper }}
			maxWidth="lg"
			open={openHistory}
			aria-labelledby="customized-dialog-title"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Quá trình sử dụng tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<Tabs
				classes={{ root: 'w-full h-64' }}
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
				<Tab className="font-sans" label={`Thông tin chung `} {...a11yProps(0)} />
				<Tab className="font-sans" label={`Quá trình sử dụng `} {...a11yProps(1)} />
			</Tabs>
			<div>
				<TabPanel value={value} index={0}>
					<InformationProceeUseAsset entitiesEdit={entitiesEdit} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<TableProcessingUseAsset entitiesEdit={entitiesEdit} />
				</TabPanel>
			</div>
		</Dialog>
	);
}
