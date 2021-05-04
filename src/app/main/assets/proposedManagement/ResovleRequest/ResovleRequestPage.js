import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React from 'react';
import RequestResovelTable from './ComponentResovleRequest';
import ResovleRequestHeader from './ComponentResovleRequest/ResovleRequestHeader';

export default function ResovleRequestPage() {
	return (
		<FusePageCardedFix
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ResovleRequestHeader />}
			content={<RequestResovelTable />}
			innerScroll
		/>
	);
}
