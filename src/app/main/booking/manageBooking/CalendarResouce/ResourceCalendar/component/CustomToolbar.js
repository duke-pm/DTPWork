/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import { Icon } from '@material-ui/core';
import Text from 'app/components/Text';
import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { Badge, Select, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { value } from 'lodash/seq';

export default function CustomToolbar(props) {
	const params = useParams();
	const parseParam = params?.id ? parseInt(params?.id) : null;
	const [resource, setResouce] = useState(parseParam);
	const history = useHistory();
	const { inforCompany } = useSelector(
		state => ({
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const { entitiesInformation } = inforCompany;
	const bkResource = entitiesInformation?.bkReSource
		? entitiesInformation.bkReSource.reduce(
				(arr, curr) => [...arr, { value: curr.resourceID, label: curr.resourceName }],
				[]
		  )
		: [];
	const handleChangeRouteList = () => {
		if (params.id) {
			history.push(`/booking/resource-calendar/list/${params.id}`);
		} else {
			history.push(`/booking/resource-calendar/list`);
		}
	};
	const { currentState } = useSelector(state => ({ currentState: state.booking.booking }), shallowEqual);
	const { entities } = currentState;
	const handleChangeResource = value => {
		setResouce(value);
		history.push(`/booking/resource-calendar/calendar/${value}`);
	};
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
				<div className="form-item-input mr-8">
					<Select placeholder="Tìm kiếm tài nguyên" value={resource} onChange={handleChangeResource} style={{ width: '200px' }}>
						{bkResource.map(p => (
							<Select.Option key={p.value} value={p.value}>
								{p.label}
							</Select.Option>
						))}
					</Select>
				</div>
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
