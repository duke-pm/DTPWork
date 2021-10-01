/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Grid, Icon } from '@material-ui/core';
import { Avatar, Tag, Tooltip, Tabs, Input, Divider } from 'antd';
import Text from 'app/components/Text';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../../_reduxBooking/bookingActions';
import { colorStatus, colorText } from '../../../BookingConfig';

const { TextArea } = Input;

const { TabPane } = Tabs;
export default function View({ entitiesEdit }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const HandleEdit = () => {
		history.push('/booking/modify-booking/updated');
	};
	const handleDelete = () => {
		history.goBack();
		dispatch(deleteBooking(entitiesEdit.bookID));
	};
	return (
		<Grid container item spacing={2}>
			<Grid container item lg={12}>
				<Grid className="mb-20" item lg={6}>
					<Text type="subTitle" className="title__view" color="primary">
						{' '}
						INFORMATION{' '}
					</Text>
				</Grid>
				<Grid container direction="row" justify="flex-end" alignItems="center" className="mb-20" lg={6}>
					{entitiesEdit?.isUpdated && (
						<div className="flex">
							<Tooltip placement="bottom" title="Edit">
								<button onClick={HandleEdit} className="action--button mr-8">
									<Icon fontSize="small">edit</Icon>
								</button>
							</Tooltip>
							<Tooltip placement="bottom" title="Delete">
								<button onClick={handleDelete} className="action--button">
									{' '}
									<Icon fontSize="small">delete</Icon>
								</button>
							</Tooltip>
						</div>
					)}
				</Grid>
				<Divider style={{ marginTop: '-10px' }} />
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Code :</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body">{entitiesEdit?.bookID}</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Created by :</Text>
			</Grid>
			<Grid item lg={6}>
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{entitiesEdit?.ownerNameAlpha}
					</Avatar>{' '}
					<Text className="ml-8" type="body">
						{entitiesEdit?.ownerName}
					</Text>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Resource :</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<div className="flex">
					<div className="booking__radio--button" style={{ backgroundColor: entitiesEdit?.color }} />
					<Text type="body" className="ml-8">
						{' '}
						{entitiesEdit?.resourceName}{' '}
					</Text>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">Resource group:</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<div className="flex">
					<Icon color="primary" fontSize="small">
						{entitiesEdit?.icon}
					</Icon>{' '}
					<Text type="body" className="ml-8">
						{' '}
						{entitiesEdit?.groupName}{' '}
					</Text>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">Status :</Text>
			</Grid>
			<Grid item lg={6}>
				<span
					className="status"
					style={{
						backgroundColor: colorStatus[entitiesEdit?.statusName],
						color: colorText[entitiesEdit?.statusName]
					}}
				>
					{' '}
					{entitiesEdit?.statusName}{' '}
				</span>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">Remark:</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body"> {entitiesEdit?.remarks ? entitiesEdit.remarks : '-'} </Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">Frequency:</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body"> {entitiesEdit?.strOneTimeBooking ? entitiesEdit.strOneTimeBooking : '-'} </Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">Members:</Text>
			</Grid>
			<Grid item lg={6}>
				<Avatar.Group>
					{entitiesEdit?.lstUserJoined?.map(item => (
						<Tooltip title={item.fullName} placement="top">
							<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
								{item.alphabet}
							</Avatar>
						</Tooltip>
					))}
				</Avatar.Group>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Booking time :</Text>
			</Grid>
			<Grid container direction="row" justify="space-between" alignItems="center" item lg={6}>
				<Tag>{moment(entitiesEdit?.startDate).format('DD/MM/YYYY')}</Tag>
				<Tag>{entitiesEdit?.strStartTime}</Tag>
				<Text color="primary">to</Text>
				<Tag>{moment(entitiesEdit?.endDate).format('DD/MM/YYYY')}</Tag>
				<Tag>{entitiesEdit?.strEndTime}</Tag>
			</Grid>
			{/* <Grid item lg={12}>
				<Text type="subTitle" className="title__view" color="primary" borderBottom>
					{' '}
					ACTIVITIES{' '}
				</Text>
			</Grid>
			<Grid item lg={12}>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Comments" key="1">
						<div>
							<div className="flex justify-between items-center">
								<Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
									L
								</Avatar>{' '}
								<TextArea disabled placeholder="Write a comment" style={{ width: '90%' }} rows={2} />
							</div>
							<div>
								<div className="mb-8">
									<div className="flex justify-between items-center mt-8">
										<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
											L
										</Avatar>{' '}
										<div className="content__comment">
											<div className="content__comment--detail">
												<div className="flex content__comment--header items-center p-2">
													<Text variant="body1" color="primary">
														The Linh
													</Text>
													<Text variant="caption" className="ml-8 time">
														31/08/2021 01:38 +07:00
													</Text>
												</div>
												<div className="">Test</div>
											</div>
										</div>
									</div>
									<div className="footer__comment flex items-center ml-64 mb-20 mt-8">
										<span> . Reply </span>
										<span className="ml-8"> . Edit</span>
										<span className="ml-8"> . Delete</span>
									</div>
								</div>
								<div className="mb-20">
									<div className="flex justify-between items-center mt-8">
										<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
											L
										</Avatar>{' '}
										<div className="content__comment">
											<div className="content__comment--detail">
												<div className="flex content__comment--header items-center p-2">
													<Text variant="body1" color="primary">
														The Linh
													</Text>
													<Text variant="caption" className="ml-8 time">
														31/08/2021 01:38 +07:00
													</Text>
												</div>
												<div className="">Test</div>
											</div>
										</div>
									</div>
									<div className="footer__comment flex items-center ml-64 mb-20 mt-8">
										<span> . Reply </span>
										<span className="ml-8"> . Edit</span>
										<span className="ml-8"> . Delete</span>
									</div>
								</div>
							</div>
						</div>
					</TabPane>
					<TabPane tab="Logs" key="2">
						<div />
					</TabPane>
				</Tabs>
			</Grid> */}
		</Grid>
	);
}
