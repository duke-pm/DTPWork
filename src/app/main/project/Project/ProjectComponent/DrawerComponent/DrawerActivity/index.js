import { Button, Typography } from '@material-ui/core';
import { Avatar, Input, Empty, Divider } from 'antd';
import React, { useState, createRef, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import { addTaskActivity } from '../../../../_redux/_projectActions';

const { TextArea } = Input;
let messagesEnd = createRef().current;

export default function DrawerActivity() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesActivity, entitiesView } = currentState;
	const [comment, setComment] = useState('');
	const submitComment = () => {
		dispatch(addTaskActivity(entitiesView.detail.taskID, comment));
		setComment('');
	};
	useEffect(() => {
		if (entitiesActivity?.length > 0) {
			scrollToBottom();
		}
	}, [entitiesActivity]);
	function scrollToBottom() {
		messagesEnd.scrollIntoView({ behavior: 'smooth' });
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-1 flex-col overflow-y-auto mb-72">
				<div>
					{entitiesActivity?.map(item => (
						<div key={item.date} className="flex flex-col">
							<Divider>
								<Typography variant="caption">
									{moment(item.date, 'DD/MM/YYYY - HH:mm').format('dddd - DD/MM/YYYY')}
								</Typography>
							</Divider>
							{item?.data.map((it, index) => {
								return (
									<div key={it.lineNum} className="flex flex-row items-start mb-6">
										<div className="flex flex-col items-center w-60 min-w-60 max-w-60">
											{((item?.data[index - 1] &&
												item?.data[index - 1].userName !== it.userName) ||
												item?.data[index - 1] === undefined) && (
												<Avatar
													style={{
														backgroundColor: '#87d068',
														verticalAlign: 'middle'
													}}
													size="large"
												>
													<Typography className="uppercase" variant="inherit">
														{sliceString(it.userName)}
													</Typography>
												</Avatar>
											)}
											<div className="flex-none mt-8">
												<Typography variant="caption">{it.timeUpdate.split('-')[1]}</Typography>
											</div>
										</div>

										<div
											className="p-16 rounded-8"
											style={{ backgroundColor: 'rgba(160,174,192,0.2)' }}
										>
											<div className="flex-none">
												<Typography className="font-bold" variant="body1">
													{it.fullName}
												</Typography>
											</div>
											<div className="mt-8">
												<Typography variant="body1">{it.comments}</Typography>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					))}
					<div style={{ float: 'left', clear: 'both' }} ref={el => (messagesEnd = el)} />
				</div>
				{entitiesView && entitiesView.activities.length === 0 ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				) : null}
			</div>

			<div className="absolute bottom-0 right-0 left-0 pt-16 pb-6 px-6 flex w-full flex-row items-center">
				<TextArea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" rows={3} />
				<div className="flex flex-1" style={{ backgroundColor: 'white' }}>
					<Button className="mx-16" onClick={submitComment} variant="contained" color="primary">
						<Typography variant="inherit">Save</Typography>
					</Button>
				</div>
			</div>
		</div>
	);
}
