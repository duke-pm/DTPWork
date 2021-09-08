/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
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
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Typography color="primary" variant="h6">
					{params.category !== 'create'
						? params.category === 'settingtask'
							? 'Task settings'
							: 'Coppy Task'
						: 'Create Task'}
				</Typography>
				<div className="projects__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="projects__content mt-8">
				<Spin spinning={loading}>
					<div className="createporjects">
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
					</div>
				</Spin>
			</div>
		</div>
	);
}
