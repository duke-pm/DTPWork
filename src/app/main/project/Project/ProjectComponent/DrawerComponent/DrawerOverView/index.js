/* eslint-disable jsx-a11y/anchor-is-valid */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Divider, Link } from '@material-ui/core';
import { Table, Badge, Dropdown, Menu, Button } from 'antd';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import { CaretDownOutlined } from '@ant-design/icons';
import { updatedTaskStatus } from 'app/main/project/_redux/_projectActions';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { badgeStatus, priorityColor } from '../../TableProject/ConfigTableProject';

export default function DrawerOverView({ closeVisible }) {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const updatedStatus = type => {
		dispatch(updatedTaskStatus(entitiesView.detail, type)).then(data => {
			if (data && !data.isError) {
				closeVisible();
				notificationConfig('success', 'Success', 'Updated status success');
			}
		});
	};
	return (
		<FuseAnimate animation="transition.slideUpBigIn" delay={300}>
			<div className="flex flex-col">
				<div className="flex flex-row mt-16">
					<p className="text-xl font-medium" style={{ color: entitiesView && entitiesView.detail.typeColor }}>
						{' '}
						{entitiesView && entitiesView.detail.typeName}{' '}
					</p>
					<p className="text-xl font-medium ml-8 "> {entitiesView && entitiesView.detail.taskName} </p>
				</div>
				<div className="flex flex-row">
					<Dropdown
						// disabled={!item.isUpdated}
						overlay={
							<Menu>
								<Menu.Item onClick={() => updatedStatus(1)} style={{ color: '#1890ff' }}>
									New
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(2)} style={{ color: '#560bad' }}>
									To be scheduled
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(3)} style={{ color: '#e85d04' }}>
									Scheduled
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(4)} style={{ color: '#faad14' }}>
									In progress
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(5)} style={{ color: '#d9d9d9' }}>
									Closed
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(6)} style={{ color: '#52c41a' }}>
									On hold
								</Menu.Item>
								<Menu.Item onClick={() => updatedStatus(7)} style={{ color: '#ff4d4f' }}>
									Rejected
								</Menu.Item>
							</Menu>
						}
						placement="bottomLeft"
						arrow
					>
						<div className="flex flex-row">
							{' '}
							<Badge
								size="default"
								style={{
									color: badgeStatus[entitiesView && entitiesView.detail.statusID],
									cursor: 'pointer'
								}}
								color={badgeStatus[entitiesView && entitiesView.detail.statusID]}
								text={entitiesView && entitiesView.detail.statusName}
							/>
							<CaretDownOutlined style={{ cursor: 'pointer', marginLeft: '10px' }} />
						</div>
					</Dropdown>
					<p className="ml-16">
						{' '}
						Created by {entitiesView && entitiesView.detail.author}. Last updated on{' '}
						{moment(entitiesView && entitiesView.detail.lUpdDate).format('DD/MM/YYYY')}{' '}
					</p>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">PEOPLE</p>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Owner </p>
						<p className="text-base font-normal text-gray-500 ml-56 ">
							{' '}
							{entitiesView && entitiesView.detail.ownerName}{' '}
						</p>
					</div>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Priority </p>
						<div className="text-base font-normal text-gray-500 ml-56 ">
							<Badge
								size="default"
								style={{ color: priorityColor[entitiesView && entitiesView.detail.priority] }}
								color={priorityColor[entitiesView && entitiesView.detail.priority]}
								text={entitiesView && entitiesView.detail.priorityName}
							/>
						</div>
					</div>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">ESTIMATE & TIME</p>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Start date task </p>
						<p className="text-base font-normal text-gray-500 ml-56 ">
							{moment(entitiesView && entitiesView.detail.startDate).format('DD/MM/YYYY')}{' '}
						</p>
					</div>
					<div className="flex flex-row">
						<p className="text-base font-normal "> End date task </p>
						<div className="text-base font-normal text-gray-500 ml-56 ">
							{moment(entitiesView && entitiesView.detail.endDate).format('DD/MM/YYYY')}{' '}
						</div>
					</div>
				</div>
			</div>
		</FuseAnimate>
	);
}
