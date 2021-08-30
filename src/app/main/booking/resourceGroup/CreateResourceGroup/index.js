/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import Form from './component/index';

export default function CreateResourceGroup() {
	const histroy = useHistory();
	const ExitPage = () => {
		histroy.goBack();
	};
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{' '}
					Create resource group{' '}
				</Typography>
				<div className="resource__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="resource__content mt-8">
				<div className="createresource">
					<Form />
				</div>
			</div>
		</div>
	);
}
