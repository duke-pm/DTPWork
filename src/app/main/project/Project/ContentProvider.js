/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, ListItemText, MenuItem, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import { Dropdown, Popover, Spin, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import ProjectComponent from './ProjectComponent';
import { ProjectContext } from './ProjectContext';
import {
	fetchProjectDetail,
	fetchOwner,
	setTaskEditProject,
	getTaskDetailAll,
	fetchProjectDetailFilter
} from '../_redux/_projectActions';

export default function ContentProvider() {
	const { currentState, project } = useSelector(
		state => ({
			currentState: state.possesion.entitiesInformation,
			projectAll: state.project.entitiesAll,
			project: state.project.entitiesDetail,
			listLoading: state.project.listLoading
		}),
		shallowEqual
	);
	const projectContext = useContext(ProjectContext);
	const {
		setOwnerFilter,
		status,
		ownerFilter,
		setStatus,
		rowPage,
		page,
		dateStart,
		sector,
		search,
		setSector,
		setSearch
	} = projectContext;
	const history = useHistory();
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
		const paramsMasterData = 'PrjStatus,PrjComponent,PrjPriority,PrjSector,PrjGrade';
		dispatch(getInformationCompany(paramsMasterData));
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchOwner()).then(data => {
			if (data && !data.isError) {
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
	const ArrProjectStatus = currentState?.projectStatus
		? currentState.projectStatus.reduce(
				(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID, colorCode: curr.colorCode }],
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
	const gradeGolbal = currentState?.projectGrade
		? currentState.projectGrade.reduce((arr, curr) => [...arr, { label: curr.gradeName, value: curr.gradeID }], [])
		: [];
	const sectorArr = currentState?.projectSector.reduce(
		(arr, curr) => [...arr, { label: curr.sectorName, value: curr.sectorID }],
		[]
	);
	const newArrayStatus = ArrProjectStatus?.filter(e => status?.includes(e.value));
	const newArrOwnerFilter = owner?.filter(e => ownerFilter?.includes(e.value));
	const newArrSector = sectorArr?.filter(e => sector?.includes(e.value));

	const handleFilterClear = item => {
		const statusClear = status.filter(it => it !== item.value);
		setStatus(statusClear);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter?.toString(),
				statusClear?.toString(),
				dateStart,
				sector?.toString(),
				search
			)
		);
	};
	const handleClearStatus = () => {
		setStatus(null);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter?.toString(),
				null,
				dateStart,
				sector?.toString(),
				search
			)
		);
	};
	const handleFilterClearOwner = item => {
		const ownerClear = ownerFilter.filter(it => it !== item.value);
		setOwnerFilter(ownerClear);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerClear?.toString(),
				status?.toString(),
				dateStart,
				sector?.toString(),
				search
			)
		);
	};
	const handleClearOwner = () => {
		setOwnerFilter(null);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				null,
				status?.toString(),
				dateStart,
				sector?.toString(),
				search
			)
		);
	};
	const handleFilterClearSector = item => {
		const sectorClear = sector.filter(it => it !== item.value);
		setSector(sectorClear);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter?.toString(),
				status?.toString(),
				dateStart,
				sectorClear?.toString(),
				search
			)
		);
	};
	const handleClearSector = () => {
		setSector(null);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter?.toString(),
				status?.toString(),
				dateStart,
				null,
				search
			)
		);
	};
	const handleClearAll = () => {
		setStatus(null);
		setOwnerFilter(null);
		setSector(null);
		dispatch(fetchProjectDetailFilter(params.detail, rowPage, page));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(
				fetchProjectDetailFilter(
					params.detail,
					rowPage,
					page,
					ownerFilter?.toString(),
					status?.toString(),
					dateStart,
					sector?.toString(),
					e.target.value
				)
			);
		}
	};
	const handleSearch = () => {
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				page,
				ownerFilter?.toString(),
				status?.toString(),
				dateStart,
				sector?.toString(),
				search
			)
		);
	};
	const handleOpenFormProject = type => {
		dispatch(setTaskEditProject(null));
		history.push(`/projects/modify-task/create/${params.detail}/${type}`);
	};
	const ExitPage = () => {
		history.goBack();
	};
	const handleChangePageChart = () => {
		history.push(`/projects/gantt-task/${params.detail}`);
	};
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				{project ? (
					<Typography color="primary" variant="h6">
						{project?.projectName}
					</Typography>
				) : (
					<Spin />
				)}
				<div className="header--action">
					<Search
						onKeyPress={event => {
							if (event.key === 'Enter') {
								handleSearch();
							}
						}}
						onChange={e => onHandleChange(e)}
						className="input--search"
						placeholder="Search"
						onSearch={handleSearch}
					/>
					{project?.isProjectOwner && (
						<Popover
							d={!project?.isProjectOwner}
							placement="rightTop"
							content={() => (
								<>
									<MenuItem onClick={() => handleOpenFormProject('Task')} role="button">
										<ListItemText style={{ color: '#007AFF' }} primary="TASK" />
									</MenuItem>
									<MenuItem onClick={() => handleOpenFormProject('Miltestone')} role="button">
										<ListItemText style={{ color: '#34C759' }} primary="MILESTONE" />
									</MenuItem>
									<MenuItem onClick={() => handleOpenFormProject('Phase')} role="button">
										<ListItemText style={{ color: '#FF9500' }} primary="PHASE" />
									</MenuItem>
								</>
							)}
						>
							<Button className="button__create mr-20" variant="contained" color="primary">
								<Typography variant="button">Create</Typography>
							</Button>
						</Popover>
					)}
					<Tooltip placement="bottom" title="Gantt chart" className="mr-20">
						<span onClick={handleChangePageChart} className="action--button">
							<Icon fontSize="small">stacked_line_chart</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			{ownerFilter?.length > 0 || status?.length > 0 || sector?.length > 0 ? (
				<div className="projects__filter px-16 mt-20">
					<div className="title_filter flex">
						<Icon fontSize="small" color="primary">
							tune
						</Icon>
						<Typography variant="body1" color="primary" className="ml-8 title">
							{' '}
							Filter
						</Typography>
					</div>
					<div className="content_filter">
						{status?.length > 0 && (
							<div className="control-filter">
								<div className="content flex items-center">
									<Typography className="" color="primary">
										Status:
									</Typography>
									<Typography color="primary" className="ml-8 value-filter">
										{newArrayStatus?.[0].label}
									</Typography>
								</div>
								<div className="action">
									<Dropdown
										overlay={
											<div className="action__dropdown">
												{newArrayStatus?.map(item => (
													<div key={item.value} className="dropdown--list">
														<Typography variant="body1" color="primary">
															{item.label}
														</Typography>
														<Icon
															onClick={() => handleFilterClear(item)}
															className="btn-icon"
															fontSize="small"
															color="primary"
														>
															clear
														</Icon>
													</div>
												))}
											</div>
										}
										placement="bottomRight"
										arrow
									>
										<Icon className="cursor-pointer btn-icon" color="primary">
											{' '}
											arrow_drop_down{' '}
										</Icon>
									</Dropdown>
									<Icon onClick={handleClearStatus} className="btn-icon" color="primary">
										clear
									</Icon>
								</div>
							</div>
						)}
						{ownerFilter?.length > 0 && (
							<div className="control-filter">
								<div className="content flex items-center">
									<Typography className="" color="primary">
										Project owner:
									</Typography>
									<Typography color="primary" className="ml-8 value-filter">
										{newArrOwnerFilter?.[0].label}
									</Typography>
								</div>
								<div className="action">
									<Dropdown
										overlay={
											<div className="action__dropdown">
												{newArrOwnerFilter?.map(item => (
													<div key={item.value} className="dropdown--list">
														<Typography variant="body1" color="primary">
															{item.label}
														</Typography>
														<Icon
															onClick={() => handleFilterClearOwner(item)}
															className="btn-icon"
															fontSize="small"
															color="primary"
														>
															clear
														</Icon>
													</div>
												))}
											</div>
										}
										placement="bottomRight"
										arrow
									>
										<Icon className="cursor-pointer btn-icon" color="primary">
											{' '}
											arrow_drop_down{' '}
										</Icon>
									</Dropdown>
									<Icon onClick={handleClearOwner} className="btn-icon" color="primary">
										clear
									</Icon>
								</div>
							</div>
						)}
						{sector?.length > 0 && (
							<div className="control-filter">
								<div className="content flex items-center">
									<Typography className="" color="primary">
										Sector:
									</Typography>
									<Typography color="primary" className="ml-8 value-filter">
										{newArrSector?.[0].label}
									</Typography>
								</div>
								<div className="action">
									<Dropdown
										overlay={
											<div className="action__dropdown">
												{newArrSector?.map(item => (
													<div key={item.value} className="dropdown--list">
														<Typography variant="body1" color="primary">
															{item.label}
														</Typography>
														<Icon
															onClick={() => handleFilterClearSector(item)}
															className="btn-icon"
															fontSize="small"
															color="primary"
														>
															clear
														</Icon>
													</div>
												))}
											</div>
										}
										placement="bottomRight"
										arrow
									>
										<Icon className="cursor-pointer btn-icon" color="primary">
											{' '}
											arrow_drop_down{' '}
										</Icon>
									</Dropdown>
									<Icon onClick={handleClearSector} className="btn-icon" color="primary">
										clear
									</Icon>
								</div>
							</div>
						)}
					</div>
					<div className="action-filter">
						<Typography
							onClick={handleClearAll}
							variant="subtitle2"
							color="primary"
							className="cursor-pointer"
						>
							{' '}
							Delete all{' '}
						</Typography>
					</div>
				</div>
			) : null}
			<div className="projects__content mt-8">
				<div className="projects__content--table px-16">
					<ProjectComponent
						owner={owner}
						project={project}
						gradeGolbal={gradeGolbal}
						ArrTaskComponent={ArrTaskComponent}
						ArrProjectStatus={ArrProjectStatus}
						ArrTaskPri={ArrTaskPri}
						params={params}
						sectorArr={sectorArr}
					/>
				</div>
			</div>
		</div>
	);
}
