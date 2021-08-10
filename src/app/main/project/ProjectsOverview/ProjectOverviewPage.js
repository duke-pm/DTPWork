import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../_redux/_projectActions';
import { getInformationCompany } from '../../assets/Possesion/_redux/possesionActions/index';
import ProjectOverviewComponent from './ProjectsOverviewComponent';

export default function ProjectOverviewPage() {
	const { currentState } = useSelector(
		state => ({ currentState: state.possesion.entitiesInformation, projectAll: state.project.entitiesAll }),
		shallowEqual
	);
	const [owner, setOwner] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.fetchsProjectOverview());
	}, [dispatch]);
	useEffect(() => {
		dispatch(actions.fetchOwner()).then(data => {
			if (!data?.isError) {
				const ownerArr = data?.data.reduce(
					(arr, curr) => [...arr, { label: curr.empName, value: curr.empID }],
					[]
				);
				setOwner(ownerArr);
			} else {
				setOwner([]);
			}
		});
	}, [dispatch]);
	useEffect(() => {
		dispatch(actions.fetchAllProject());
	}, [dispatch]);
	useEffect(() => {
		const params = 'PrjStatus,PrjSector';
		dispatch(getInformationCompany(params));
	}, [dispatch]);
	const ArrProjectStatus = currentState?.projectStatus?.reduce(
		(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID, colorCode: curr.colorCode }],
		[]
	);
	const sectorArr = currentState?.projectSector.reduce(
		(arr, curr) => [...arr, { label: curr.sectorName, value: curr.sectorID }],
		[]
	);
	return (
		<>
			<FusePageCarded
				innerScroll
				classes={{
					// content: 'flex',
					header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
				}}
				header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography className="text-16 sm:text-20 truncate" color="inherit">
									{/* {xhtm} */}
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}
				contentToolbar={
					<div className="flex items-center p-16 flex-1">
						<Typography variant="h6">Project overview</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<ProjectOverviewComponent
							sectorArr={sectorArr}
							ArrProjectStatus={ArrProjectStatus}
							owner={owner}
						/>
					</Box>
				}
			/>
		</>
	);
}
