import React from 'react';
import { Badge, Select } from 'antd';

const { Option } = Select;
export default function DrawerWatchers() {
	const data = [
		{ label: 'LinhCt', value: '1' },
		{ label: 'Anonymus', value: '2' },
		{ label: 'Cristiarona', value: '3' }
	];
	return (
		<div>
			<div className="flex flex-col ml-8">
				<div className="text-sm font-medium text-black head-example "> View </div>
				<div className="w-full flex-none text-sm font-normal text-gray-500">
					List of users viewing my tasks{' '}
				</div>
			</div>
			<div className="mt-16">
				<Select
					value={['1', '2', '3']}
					style={{ width: '100%' }}
					showSearch
					// allowClear
					mode="multiple"
					maxTagCount={4}
				>
					{data.map(p => (
						<Option key={p.value} value={p.value}>
							{p.label}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}
