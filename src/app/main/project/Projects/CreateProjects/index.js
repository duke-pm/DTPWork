/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import FormComponent from './Component';
import * as actions from '../../_redux/_projectActions';

export default function CreateProjects() {
	const dispatch = useDispatch();
	const [owner, setOwner] = useState([]);
	const [loading, setLoading] = useState(false);
	const params = useParams();
	const { projectAll } = useSelector(
		state => ({ currentState: state.possesion.entitiesInformation, projectAll: state.project.entitiesAll }),
		shallowEqual
	);
	const projectSub = projectAll?.reduce((arr, curr) => [...arr, { label: curr.prjName, value: curr.prjID }], []);
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
		dispatch(actions.fetchAllProject());
	}, [dispatch]);
	const role = getDataUserLocalStorage();
	const history = useHistory();
	const ExitPage = () => {
		history.goBack();
	};
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Typography color="primary" variant="h6">
					{params.type !== 'create'
						? params.type === 'Settings'
							? 'Setting project'
							: 'Clone project'
						: 'Create project'}
				</Typography>

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
					<Grid item lg={3} md={3} sm={false} xs={false} />
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Spin spinning={loading}>
							<FormComponent role={role} owner={owner} projectSub={projectSub} />
						</Spin>
					</Grid>
					<Grid item lg={3} md={3} sm={false} xs={false} />
				</Grid>
			</div>
		</div>
	);
}
