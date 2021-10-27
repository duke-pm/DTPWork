/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import { Icon } from '@material-ui/core';
import Text from 'app/components/Text';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { Badge, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

export default function CustomToolbar(props) {
	const history = useHistory();
	const params = useParams();
	const handleChangeRouteList = () => {
		history.push(`/booking/resource-calendar/list/${params.id}`);
	};
	const { currentState } = useSelector(state => ({ currentState: state.booking.booking }), shallowEqual);
	const { entities } = currentState;
	return (
		<div className="booking__subcontent">
			<div className="flex justify-between">
				<Text color="primary" type="subTitle">
					{' '}
					{entities?.header?.[0].countBooking} Booking{' '}
				</Text>
				<Badge
					style={{ marginLeft: '12px' }}
					color="#069662"
					text={`${entities?.header?.[0].countHappening} Đang xảy ra`}
				/>
				<Badge
					style={{ marginLeft: '12px' }}
					color="#d71d31"
					text={`${entities?.header?.[0].countHappened} Đã xảy ra`}
				/>
				<Badge
					style={{ marginLeft: '12px' }}
					color="#f1b228"
					text={`${entities?.header?.[0].countPending} Chưa xảy ra`}
				/>
			</div>
			<div className="flex justify-between items-center">
				<button onClick={() => props.onNavigate('TODAY')} className="buttonToday mr-16">
					<Text color="primary" type="subTitle">
						Today
					</Text>
				</button>
				{props.view === 'day' && (
					<Tooltip placement="bottom" title="Mode month">
						<button onClick={() => props.onView('month')} className="buttonToday mr-16">
							<Text color="primary" type="subTitle">
								Month
							</Text>
						</button>
					</Tooltip>
				)}
				<button onClick={() => props.onNavigate('PREV')} className="buttonIcon  mr-16">
					{' '}
					<Icon color="primary"> navigate_before </Icon>{' '}
				</button>
				<button onClick={() => props.onNavigate('NEXT')} className="buttonIcon mr-16">
					{' '}
					<Icon color="primary"> navigate_next </Icon>{' '}
				</button>
				<Text type="subTitle" color="primary" className="mr-16">
					{' '}
					Month {moment(props.date).format(' MM , YYYY')}{' '}
				</Text>
				<div className="booking__subcontent--action">
					<span className="btn__btn--action active mr-8">
						{' '}
						<Icon fontSize="small" color="primary">
							{' '}
							border_all{' '}
						</Icon>{' '}
					</span>
					<span onClick={handleChangeRouteList} className="btn__btn--action">
						{' '}
						<Icon fontSize="small" color="primary">
							{' '}
							list{' '}
						</Icon>{' '}
					</span>
				</div>
			</div>
		</div>
	);
}
