/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Icon } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import Text from 'app/components/Text';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Content from './component/index';

export default function AllBookingView() {
	const histroy = useHistory();
	const ExitPage = () => histroy.goBack();
	const { currentState } = useSelector(
		state => ({
			currentState: state.booking.booking
		}),
		shallowEqual
	);
	const { actionLoading, entitiesEdit } = currentState;
	useEffect(() => {
		if (!entitiesEdit) histroy.goBack();
	}, [entitiesEdit, histroy]);
	return (
		<div className="container booking">
			<div className="booking__header px-16 shadow-lg">
				<Text color="primary" type="title">
					{entitiesEdit?.purpose}
				</Text>
				<div className="booking__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="booking__content mt-8">
				<Spin spinning={actionLoading}>
					<div className="booking__content--view">
						<Content entitiesEdit={entitiesEdit} />
					</div>
				</Spin>
			</div>
		</div>
	);
}
