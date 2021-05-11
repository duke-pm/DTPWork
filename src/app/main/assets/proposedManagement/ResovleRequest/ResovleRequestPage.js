import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React from 'react';
import RequestResovelTable from './ComponentResovleRequest';
import ResovleRequestHeader from './ComponentResovleRequest/ResovleRequestHeader';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/FormConfirmGobal';
import FormCustomCorrupt from './FormControlConfirm/FormCustomCorrupt';

export default function ResovleRequestPage() {
	return (
		<>
			<FormAllocation />
			<FormConfirmGobal />
			<FormCustomCorrupt />
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
		</>
	);
}
