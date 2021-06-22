import { Button, Divider } from '@material-ui/core';
import { Avatar, Input, Empty } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { addTaskActivity } from '../../../../_redux/_projectActions';

const { TextArea } = Input;

export default function DrawerActivity() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const chatRef = useRef(null);
	const [comment, setComment] = useState('');
	const submitComment = () => {
		dispatch(addTaskActivity(entitiesView.detail.taskID, comment));
		setComment('');
	};
	const classes = DtpCustomStyles();
	useEffect(() => {
		if (entitiesView.activities) {
			scrollToBottom();
		}
	}, [entitiesView.activities]);
	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}
	return (
		<div className="flex flex-col">
			<div style={{ height: classes.Acitivity }}>
				<FuseScrollbars ref={chatRef} className="flex-col overflow-y-auto xl:max-h-640 max-h-400">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{entitiesView &&
							entitiesView.activities.map(item => (
								<div key={item.lineNum} className="flex flex-col">
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
												<p className="uppercase"> {sliceString(item.userName)}</p>
											</Avatar>
											<div className="flex flex-col ml-8">
												<div className="w-full flex-none text-sm font-medium text-black ">
													{' '}
													{item.fullName}{' '}
												</div>
												<div className="w-full flex-none text-sm font-normal text-gray-500">
													{' '}
													Updated on {item.timeUpdate}{' '}
												</div>
											</div>
										</div>
										<div className="font-medium flex-none"> #{item.rowNum}</div>
									</div>
									<div className="mt-8" style={{ marginLeft: '4.8rem' }}>
										<p className="text-sm font-light">{item.comments}</p>
									</div>
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
				<TextArea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" rows={3} />
			</div>
			<div className="flex flex-row justify-end mt-8">
				<Button onClick={submitComment} variant="contained" className="mr-8" color="primary">
					Save
				</Button>{' '}
			</div>
		</div>
	);
}
