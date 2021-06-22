import FuseAnimate from '@fuse/core/FuseAnimate';
import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import { Spin } from 'antd';
import FusePageCardedTask from '@fuse/core/FusePageCarded/FusePageCardedTask';
import ProjectComponent from './ProjectComponent';
import { ProjectContext } from './ProjectContext';
import { fetchProjectDetail, fetchOwner, fetchAllSubTask, getTaskDetailAll } from '../_redux/_projectActions';

export default function ContentProvider() {
	const { currentState, projectAll, project, listLoading } = useSelector(
		state => ({
			currentState: state.possesion.entitiesInformation,
			projectAll: state.project.entitiesAll,
			project: state.project.entitiesDetail,
			listLoading: state.project.listLoading
		}),
		shallowEqual
	);
	const projectContext = useContext(ProjectContext);
	const { formProject } = projectContext;
	const params = useParams();
	const dispatch = useDispatch();
	const [owner, setOwner] = useState([]);
	useEffect(() => {
		dispatch(getTaskDetailAll(params.detail));
	}, [params.detail, dispatch]);
	useEffect(() => {
		dispatch(fetchProjectDetail(params.detail));
	}, [params.detail, dispatch]);
	useEffect(() => {
		const paramsMasterData = 'PrjStatus,PrjComponent,PrjPriority,PrjSector';
		dispatch(getInformationCompany(paramsMasterData));
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchOwner()).then(data => {
			if (!data.isError) {
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
	const ArrProjectStatus = currentState?.projectStatus
		? currentState.projectStatus.reduce(
				(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID }],
				[]
		  )
		: [];
	const ArrTaskPri = currentState?.projectPriority
		? currentState.projectPriority.reduce(
				(arr, curr) => [...arr, { label: curr.priorityName, value: curr.priority }],
				[]
		  )
		: [];
	const ArrTaskComponent = currentState?.projectComponent
		? currentState.projectComponent.reduce(
				(arr, curr) => [...arr, { label: curr.componentName, value: curr.componentID }],
				[]
		  )
		: [];
	const taskSub = projectAll
		? projectAll.reduce((arr, curr) => [...arr, { label: curr.taskName, value: curr.taskID }], [])
		: [];
	const gradeGolbal = [
		{ label: 'Grade 1', value: 1 },
		{ label: 'Grade 2', value: 2 },
		{ label: 'Grade 3', value: 3 },
		{ label: 'Grade 4', value: 4 },
		{ label: 'Grade 5', value: 5 },
		{ label: 'Grade 6', value: 6 },
		{ label: 'Grade 7', value: 7 },
		{ label: 'Grade 8', value: 8 },
		{ label: 'Grade 9', value: 9 },
		{ label: 'Grade 10', value: 10 },
		{ label: 'Grade 11', value: 11 },
		{ label: 'Grade 12', value: 12 }
	];
	const sectorArr = currentState?.projectSector.reduce(
		(arr, curr) => [...arr, { label: curr.sectorName, value: curr.sectorID }],
		[]
	);
	return (
		<FusePageCardedTask
			innerScroll
			formProject={formProject.open}
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
					<p className="font-semibold flex text-sm	">
						Project plan of {listLoading ? <Spin style={{ marginLeft: '20px' }} /> : project.projectName}
					</p>
				</div>
			}
			content={
				<Box p={3}>
					<ProjectComponent
						owner={owner}
						project={project}
						gradeGolbal={gradeGolbal}
						taskSub={taskSub}
						ArrTaskComponent={ArrTaskComponent}
						ArrProjectStatus={ArrProjectStatus}
						ArrTaskPri={ArrTaskPri}
						params={params}
						sectorArr={sectorArr}
					/>
				</Box>
			}
		/>
	);
}
