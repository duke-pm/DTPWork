import { Button, Typography } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TableResourceGroup from './component/TableResourceGroup';

export default function ResourceGroupPage() {
	const history = useHistory();
	const handleChangeRoute = () => {
		history.push('/booking/resource-group/create-resource-group');
	};
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Typography color="primary" variant="h6">
					{' '}
					Resource group{' '}
				</Typography>
				<div className="resource__header--action">
					<Search className="input__search" placeholder="Search" />
					<Button
						onClick={handleChangeRoute}
						className="button__create--group"
						variant="contained"
						color="primary"
					>
						{' '}
						<Typography variant="body2"> Create resource group </Typography>
					</Button>
				</div>
			</div>
			<div className="resource__content mt-8">
				<div className="resource__content--table px-16">
					<TableResourceGroup />
				</div>
			</div>
		</div>
	);
}
