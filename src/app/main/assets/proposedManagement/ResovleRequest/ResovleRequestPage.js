import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React, { useState, useContext } from 'react';
import TimeLine from '../TimeLine';
import RequestResovelTable from './ComponentResovleRequest';
import ActionComponent from './ComponentResovleRequest/FilterActionComponent';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/FormConfirmGobal';
import FormCustomCorrupt from './FormControlConfirm/FormCustomCorrupt';
import { ResovleContext } from './ResovleRequestContext';

export default function ResovleRequestPage() {
	const ResovleContextHandle = useContext(ResovleContext);
	const { setTimeLine, timeLine } = ResovleContextHandle;
	return (
		<>
			<TimeLine setTimeLine={setTimeLine} timeLine={timeLine} />
			<FormAllocation />
			<FormConfirmGobal />
			<FormCustomCorrupt />
			<FusePageCardedFix
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<ActionComponent />}
				content={<RequestResovelTable />}
				innerScroll
			/>
		</>
	);
}
