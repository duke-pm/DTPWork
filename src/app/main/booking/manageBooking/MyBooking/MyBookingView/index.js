/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import Content from './component/index';

export default function AllBookingView() {
	const histroy = useHistory();
	const ExitPage = () => {
		histroy.goBack();
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					Resource
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
				<div className="booking__content--view">
					<Content />
				</div>
			</div>
		</div>
	);
}
