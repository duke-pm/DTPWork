/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import Form from './component/index';

export default function AllBookingCreate() {
	const histroy = useHistory();
	const ExitPage = () => {
		histroy.goBack();
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					{' '}
					Create Booking
				</Typography>
				<div className="booking__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="booking__content mt-8">
				<div className="create-booking">
					<Form />
				</div>
			</div>
		</div>
	);
}
