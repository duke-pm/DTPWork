/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Grid, Icon, Typography } from '@material-ui/core';
import { Avatar, Tag, Tooltip, Tabs, Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const { TabPane } = Tabs;
export default function index() {
	return (
		<Grid container item spacing={2}>
			<Grid className="mb-20" item lg={6}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					{' '}
					INFORMATION{' '}
				</Typography>
			</Grid>
			<Grid container direction="row" justify="flex-end" alignItems="center" className="mb-20" lg={6}>
				<div>
					<Tooltip placement="bottom" title="Edit">
						<button className="btn--primary mr-8"> Edit </button>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
						<button className="btn--primary"> Delete </button>
					</Tooltip>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Code :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2"> BKRS-1</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Created by :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						L
					</Avatar>{' '}
					<Typography className="ml-8" variant="body2">
						The Linh
					</Typography>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Resource :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2">Phòng họp</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					Resource group:
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2"> Phòng họp HCM</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					Frequency :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="body2"> One-time booking</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Booking time :
				</Typography>
			</Grid>
			<Grid container direction="row" justify="space-between" alignItems="center" item lg={6}>
				<Tag>04/09/2021</Tag>
				<Tag>22:00</Tag>
				<Typography color="primary">to</Typography>
				<Tag>04/09/2021</Tag>
				<Tag>22:00</Tag>
			</Grid>
			<Grid item lg={12}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					{' '}
					ACTIVITIES{' '}
				</Typography>
			</Grid>
			<Grid item lg={12}>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Comments" key="1">
						<div>
							<div className="flex justify-between items-center">
								<Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
									L
								</Avatar>{' '}
								<TextArea placeholder="Write a comment" style={{ width: '90%' }} rows={2} />
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
													<Typography variant="body1" color="primary">
														The Linh
													</Typography>
													<Typography variant="caption" className="ml-8 time">
														31/08/2021 01:38 +07:00
													</Typography>
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
													<Typography variant="body1" color="primary">
														The Linh
													</Typography>
													<Typography variant="caption" className="ml-8 time">
														31/08/2021 01:38 +07:00
													</Typography>
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
					{/* <TabPane tab="Logs" key="2">
						<div>

						</div>
					</TabPane> */}
				</Tabs>
			</Grid>
		</Grid>
	);
}
