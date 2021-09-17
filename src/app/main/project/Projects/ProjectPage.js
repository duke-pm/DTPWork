import { Button, Icon, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import ProjectComponent from './ProjectsComponent';
import * as actions from '../_redux/_projectActions';
import { getInformationCompany } from '../../assets/Possesion/_redux/possesionActions/index';
import { ProjectContext } from './ProjectContext';

export default function ProjectPage() {
	const history = useHistory();
	const { currentState } = useSelector(
		state => ({ currentState: state.possesion.entitiesInformation, projectAll: state.project.entitiesAll }),
		shallowEqual
	);
	const projectContext = useContext(ProjectContext);
	const { status, ownerFilter, setStatus, setOwnerFilter, rowPage, page, dateStart, search, setSearch } =
		projectContext;
	const [owner, setOwner] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.fetchsProject());
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
	const newArrayStatus = ArrProjectStatus?.filter(e => status?.includes(e.value));
	const newArrOwnerFilter = owner?.filter(e => ownerFilter?.includes(e.value));
	const handleFilterClear = item => {
		const statusClear = status.filter(it => it !== item.value);
		setStatus(statusClear);
		dispatch(
			actions.fetchsProjectFilter(
				rowPage,
				page,
				statusClear?.toString(),
				ownerFilter?.toString(),
				dateStart,
				search
			)
		);
	};
	const handleClearStatus = () => {
		setStatus(null);
		dispatch(actions.fetchsProjectFilter(rowPage, page, null, ownerFilter?.toString(), dateStart, search));
	};
	const handleFilterClearOwner = item => {
		const ownerClear = ownerFilter.filter(it => it !== item.value);
		setOwnerFilter(ownerClear);
		dispatch(
			actions.fetchsProjectFilter(rowPage, page, status?.toString(), ownerClear.toString(), dateStart, search)
		);
	};
	const handleClearOwner = () => {
		setOwnerFilter(null);
		dispatch(actions.fetchsProjectFilter(rowPage, page, status?.toString(), null, dateStart, search));
	};
	const handleClearAll = () => {
		setStatus(null);
		setOwnerFilter(null);
		dispatch(actions.fetchsProjectFilter(rowPage, page));
	};
	const handleChangeRoute = () => {
		history.push('/projects/modify/create');
		dispatch(actions.setTaskEditProject(null));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(
				actions.fetchsProjectFilter(
					rowPage,
					page,
					status?.toString(),
					ownerFilter?.toString(),
					dateStart,
					e.target.value
				)
			);
		}
	};
	const handleSearch = () => {
		dispatch(
			actions.fetchsProjectFilter(rowPage, page, status?.toString(), ownerFilter?.toString(), dateStart, search)
		);
	};
	return (
		<>
			<div className="container projects">
				<div className="projects__header px-16">
					<Typography color="primary" variant="h6">
						Projects
					</Typography>
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
						<Button
							onClick={handleChangeRoute}
							className="button__create"
							variant="contained"
							color="primary"
						>
							{' '}
							<Typography variant="body2"> Create projects </Typography>
						</Button>
					</div>
				</div>
				{ownerFilter?.length > 0 || status?.length > 0 ? (
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
				{/* <div className="projects__content mt-8"> */}
				<div className="mt-8 px-16 pb-96 h-full">
					<ProjectComponent ArrProjectStatus={ArrProjectStatus} owner={owner} />
				</div>
				{/* </div> */}
			</div>
		</>
	);
}
