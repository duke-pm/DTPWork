/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import Text from 'app/components/Text';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteResourceGroup } from '../_reduxResourceBookingGroup/resourceBookingGroupActions';
import Content from './component/index';

export default function ResourceGroupView() {
	const histroy = useHistory();
	const dispatch = useDispatch();
	const ExitPage = () => histroy.goBack();
	const { currentState } = useSelector(
		state => ({
			currentState: state.booking.resourceGroup
		}),
		shallowEqual
	);
	const { actionLoading, entitiesEdit } = currentState;
	useEffect(() => {
		if (!entitiesEdit) histroy.goBack();
	}, [entitiesEdit, histroy]);
	const handleEditPage = () => histroy.push('/booking/resource-group/modify-resource-group/updates');
	const handleDeletePage = () => {
		dispatch(deleteResourceGroup(entitiesEdit.groupID));
		ExitPage();
	};
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Text color="primary" type="title">
					{entitiesEdit?.groupName}
				</Text>
				<div className="resource__header--action">
					<Tooltip placement="bottom" title="Edit">
						<span onClick={handleEditPage} className="action--button mr-20">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
						<span onClick={handleDeletePage} className="action--button mr-20">
							<Icon fontSize="small">delete</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="resource__content mt-8">
				<Spin spinning={actionLoading}>
					<div className="resource__content--view">
						<Content entitiesEdit={entitiesEdit} />
					</div>
				</Spin>
			</div>
		</div>
	);
}
