import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import { useStyles } from '../Projects/styleProject';
import ProjectComponent from './ProjectComponent';
import ActionHeaderProject from './ProjectComponent/ActionProjectComponent/ActionHeaderProject';
import FormProject from './ProjectComponent/FormProject';
import ProjectContextProvider from './ProjectContext';
import { fetchProjectDetail, fetchOwner, fetchAllSubTask } from '../_redux/_projectActions';

export default function Project() {
	const { currentState, projectAll, project } = useSelector(
		state => ({
			currentState: state.possesion.entitiesInformation,
			projectAll: state.project.entitiesAll,
			project: state.project.entitiesDetail
		}),
		shallowEqual
	);
	const params = useParams();
	const dispatch = useDispatch();
	const [owner, setOwner] = useState([]);
	useEffect(() => {
		dispatch(fetchProjectDetail(params.detail));
	}, [params.detail]);
	useEffect(() => {
		const paramsMasterData = 'PrjStatus,PrjComponent,PrjPriority';
		dispatch(getInformationCompany(paramsMasterData));
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchOwner()).then(data => {
			if (data && !data.isError) {
				const ownerArr = data.data.reduce(
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
		dispatch(fetchAllSubTask(params.detail));
	}, [dispatch, params.detail]);
	const ArrProjectStatus =
		currentState &&
		currentState.projectStatus.reduce(
			(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID }],
			[]
		);
	const ArrTaskPri =
		currentState &&
		currentState.projectPriority.reduce(
			(arr, curr) => [...arr, { label: curr.priorityName, value: curr.priority }],
			[]
		);
	const ArrTaskComponent =
		currentState &&
		currentState.projectComponent.reduce(
			(arr, curr) => [...arr, { label: curr.componentName, value: curr.componentID }],
			[]
		);
	const taskSub =
		projectAll && projectAll.reduce((arr, curr) => [...arr, { label: curr.taskName, value: curr.taskID }], []);
	const gradeGolbal = [
		{ label: ' Lớp 1', value: 1 },
		{ label: 'Lớp 2', value: 2 },
		{ label: 'Lớp 3', value: 3 },
		{ label: 'Lớp 4', value: 4 },
		{ label: 'Lớp 5', value: 5 },
		{ label: 'Lớp 6', value: 6 },
		{ label: 'Lớp 7', value: 7 },
		{ label: 'Lớp 8', value: 8 },
		{ label: 'Lớp 9', value: 9 },
		{ label: 'Lớp 10', value: 10 },
		{ label: 'Lớp 11', value: 11 },
		{ label: 'Lớp 12', value: 12 }
	];
	return (
		<ProjectContextProvider>
			<FormProject
				owner={owner}
				gradeGolbal={gradeGolbal}
				taskSub={taskSub}
				ArrTaskComponent={ArrTaskComponent}
				ArrProjectStatus={ArrProjectStatus}
				ArrTaskPri={ArrTaskPri}
				params={params}
			/>
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
								<Typography
									className="text-16 sm:text-20 truncate"
									// component={Link}
									// role="button"
									// to="/apps/e-commerce/orders"
									color="inherit"
								>
									{/* {xhtm} */}
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}
				contentToolbar={
					<div className="flex  items-center px-16 flex-1">
						<Typography component="span" className="font-bold flex text-sm	">
							Project plan of {project.projectName}
						</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<ProjectComponent />
					</Box>
				}
			/>
		</ProjectContextProvider>
	);
}
