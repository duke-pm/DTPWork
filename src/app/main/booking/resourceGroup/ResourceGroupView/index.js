/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import Content from './component/index';

export default function ResourceGroupView() {
	const histroy = useHistory();
	const ExitPage = () => {
		histroy.goBack();
	};
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					Đào tạo
				</Typography>
				<div className="resource__header--action">
					<Tooltip placement="bottom" title="Edit">
						<span className="action--button mr-20">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
						<span className="action--button mr-20">
							<Icon fontSize="small">delete</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="resource__content mt-8">
				<div className="resource__content--view">
					<Content />
				</div>
			</div>
		</div>
	);
}
