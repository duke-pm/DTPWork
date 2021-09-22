import React, { useEffect, useState, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Search from 'antd/lib/input/Search';
import Text from 'app/components/Text';
import * as actions from '../_redux/_projectActions';
import { getInformationCompany } from '../../assets/Possesion/_redux/possesionActions/index';
import ProjectOverviewComponent from './ProjectsOverviewComponent';
import { fetchsProjectOverviewFilter } from '../_redux/_projectActions';
import { ProjectOverviewContext } from './ProjectOverviewContext';

export default function ProjectOverviewPage() {
	const { currentState } = useSelector(
		state => ({ currentState: state.possesion.entitiesInformation, projectAll: state.project.entitiesAll }),
		shallowEqual
	);
	const projectContext = useContext(ProjectOverviewContext);
	const { page, rowPage, status, ownerFilter, year, sector, dateStart, dateEnd, search, setSearch } = projectContext;
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
	const handleSearch = () => {
		dispatch(
			fetchsProjectOverviewFilter(rowPage, page, year, ownerFilter, sector, status, dateStart, dateEnd, search)
		);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(
				fetchsProjectOverviewFilter(
					rowPage,
					page,
					year,
					ownerFilter,
					sector,
					status,
					dateStart,
					dateEnd,
					e.target.value
				)
			);
		}
	};
	return (
		<>
			<div className="container projects">
				<div className="projects__header px-16">
					<Text type="title" color="primary">
						Projects Overview
					</Text>
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
					</div>
				</div>
				<div className="projects__content mt-8">
					<div className="projects__content--table px-16">
						<ProjectOverviewComponent
							sectorArr={sectorArr}
							ArrProjectStatus={ArrProjectStatus}
							owner={owner}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
