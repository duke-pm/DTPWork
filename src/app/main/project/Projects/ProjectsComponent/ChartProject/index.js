/* eslint-disable no-shadow */
import { AppBar, Dialog, IconButton, Toolbar } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual } from 'react-redux';
import Text from 'app/components/Text';
import ApexChart from './ChartHorizal';
import { ProjectContext } from '../../ProjectContext';

export default function ChartProject() {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { listLoading, actionLoading, entitiesGantt, entitiesEdit } = currentState;
	const projectContext = useContext(ProjectContext);
	const { setChart, chart } = projectContext;
	const handleCloseChart = () => setChart(false);
	return (
		<Dialog fullWidth style={{ zIndex: 20 }} maxWidth="md" aria-labelledby="customized-dialog-title" open={chart}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseChart} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Text type="subTitle">Project plan of {entitiesEdit?.prjName}</Text>
				</Toolbar>
			</AppBar>
			<ApexChart entitiesGantt={entitiesGantt} />
		</Dialog>
	);
}
