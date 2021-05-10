import React from 'react';
import ActionComponent from './FilterActionComponent';

export default function GroupUserHeader() {
	return (
		<div className="flex flex-row gap-16 w-full items-center justify-between">
			<ActionComponent />
		</div>
	);
}
