/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography, Grid } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import Text from 'app/components/Text';
import FormComponent from './Component';
import * as actions from '../../_redux/_projectActions';

export default function CreateProjects() {
	const dispatch = useDispatch();
	const [owner, setOwner] = useState([]);
	const [loading, setLoading] = useState(false);
	const params = useParams();
	useEffect(() => {
		const paramsMasterData = 'PrjStatus,PrjComponent,PrjPriority,PrjSector,PrjGrade';
		dispatch(getInformationCompany(paramsMasterData));
	}, [dispatch]);
	const { currentState, projectAll } = useSelector(
		state => ({ currentState: state.possesion.entitiesInformation, projectAll: state.project.entitiesAll }),
		shallowEqual
	);
	const ArrProjectStatus = currentState?.projectStatus
		? currentState.projectStatus.reduce(
				(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID, colorCode: curr.colorCode }],
				[]
		  )
		: [];
	const taskSub = projectAll
		? projectAll.reduce((arr, curr) => [...arr, { label: curr.taskName, value: curr.taskID }], [])
		: [];
	const ArrTaskPri = currentState?.projectPriority
		? currentState.projectPriority.reduce(
				(arr, curr) => [...arr, { label: curr.priorityName, value: curr.priority }],
				[]
		  )
		: [];
	const sectorArr = currentState?.projectSector
		? currentState.projectSector.reduce(
				(arr, curr) => [...arr, { label: curr.sectorName, value: curr.sectorID }],
				[]
		  )
		: [];
	const ArrTaskComponent = currentState?.projectComponent
		? currentState.projectComponent.reduce(
				(arr, curr) => [...arr, { label: curr.componentName, value: curr.componentID }],
				[]
		  )
		: [];
	const gradeGolbal = currentState?.projectGrade
		? currentState.projectGrade.reduce((arr, curr) => [...arr, { label: curr.gradeName, value: curr.gradeID }], [])
		: [];
	useEffect(() => {
		setLoading(true);
		dispatch(actions.fetchOwner()).then(data => {
			if (!data?.isError) {
				const ownerArr = data?.data.reduce(
					(arr, curr) => [...arr, { label: curr.empName, value: curr.empID }],
					[]
				);
				setLoading(false);
				setOwner(ownerArr);
			} else {
				setLoading(false);
				setOwner([]);
			}
		});
	}, [dispatch]);
	useEffect(() => {
		dispatch(actions.fetchAllSubTask(params.id));
	}, [dispatch, params.id]);
	const role = getDataUserLocalStorage();
	const history = useHistory();
	const ExitPage = () => {
		history.goBack();
	};
	console.log(params);
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Text
					type="title"
					color="primary"
					label={
						params.category !== 'create'
							? params.category === 'settingtask'
								? 'Task Settings'
								: 'Copy Task'
							: `Create ${params.type}`
					}
				/>

				<div className="projects__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>

			<div className="projects__content mt-8 flex flex-col items-center">
				<Grid container className="w-full p-16">
					<Grid item lg={2} md={3} sm={false} xs={false} />
					<Grid item lg={8} md={6} sm={12} xs={12}>
						<Spin spinning={loading}>
							<FormComponent
								ArrProjectStatus={ArrProjectStatus}
								role={role}
								owner={owner}
								taskSub={taskSub}
								ArrTaskPri={ArrTaskPri}
								sectorArr={sectorArr}
								ArrTaskComponent={ArrTaskComponent}
								gradeGolbal={gradeGolbal}
							/>
						</Spin>
					</Grid>
					<Grid item lg={2} md={3} sm={false} xs={false} />
				</Grid>
			</div>
		</div>
	);
}
