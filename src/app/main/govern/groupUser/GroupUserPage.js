import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React from 'react';
import GroupUserHeader from './GroupUserComponent/GroupUserHeader';

export default function GroupUserPage() {
	return (
		<>
			<FusePageCardedFix
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<GroupUserHeader />}
			/>
		</>
	);
}
