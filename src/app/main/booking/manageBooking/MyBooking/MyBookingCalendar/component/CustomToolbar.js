/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import { Icon } from '@material-ui/core';
import Text from 'app/components/Text';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';

export default function CustomToolbar(props) {
	const history = useHistory();
	const handleChangeRouteList = () => {
		history.push('/booking/list-my-booking');
	};
	return (
		<div className="booking__subcontent">
			<div>
				<Text color="primary" variant="subtitle1">
					{' '}
					9 Booking{' '}
				</Text>
			</div>
			<div className="flex justify-between items-center">
				<button onClick={() => props.onNavigate('TODAY')} className="buttonToday mr-16">
					<Text color="primary" type="subTitle">
						Today
					</Text>
				</button>
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
