import { Button } from '@material-ui/core';
import { Avatar, Input, Empty, Divider } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import * as moment from 'moment';
import { addTaskActivity } from '../../../../_redux/_projectActions';

const { TextArea } = Input;

export default function DrawerActivity() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesActivity, entitiesView } = currentState;
	const chatRef = useRef(null);
	const [comment, setComment] = useState('');
	const submitComment = () => {
		dispatch(addTaskActivity(entitiesView.detail.taskID, comment));
		setComment('');
	};
	const classes = DtpCustomStyles();
	useEffect(() => {
		if (entitiesActivity?.length > 0) {
			scrollToBottom();
		}
	}, [entitiesActivity]);
	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}
	return (
		<div className="flex flex-col">
			<div className={classes.Acitivity}>
				<FuseScrollbars ref={chatRef} className="flex-col overflow-y-auto xl:max-h-512 max-h-360">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{entitiesActivity?.map(item => (
							<div key={item.date} className="flex flex-col">
								{' '}
								<Divider>
									{moment(item.date, 'DD/MM/YYYY - HH:mm').format('dddd - DD/MM/YYYY')}
								</Divider>{' '}
								{item?.data.map(it => (
									<div key={it.lineNum} className="flex flex-col">
										<div className="flex flex-row justify-between">
											<div className="flex flex-row">
												<Avatar
													style={{
														backgroundColor: '#87d068',
														verticalAlign: 'middle',
														marginTop: 5
													}}
													size="large"
												>
													<p className="uppercase"> {sliceString(it.userName)}</p>
												</Avatar>
												<div className="flex flex-col ml-8">
													<div className="w-full flex-none text-sm font-medium text-black ">
														{' '}
														{it.fullName}{' '}
													</div>
													<div className="w-full flex-none text-sm font-normal text-gray-500">
														{' '}
														Updated on {it.timeUpdate.split('-')[1]}{' '}
													</div>
												</div>
											</div>
											<div className="font-medium flex-none"> #{it.rowNum}</div>
										</div>
										<div className="mt-8" style={{ marginLeft: '4.8rem' }}>
											<p className="text-sm font-light">{it.comments}</p>
										</div>
									</div>
								))}
							</div>
						))}
					</FuseAnimateGroup>
					{entitiesView && entitiesView.activities.length === 0 ? (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					) : null}
				</FuseScrollbars>
			</div>
			<Divider />
			<div className="flex flex-row justify-between mt-16">
				<TextArea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" rows={5} />
			</div>
			<div className="flex flex-row justify-end mt-8">
				<Button onClick={submitComment} variant="contained" className="mr-1" color="primary">
					Save
				</Button>{' '}
			</div>
		</div>
	);
}
