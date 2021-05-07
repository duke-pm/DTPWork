import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as moment from 'moment';
import HandlingBody from './ComponentHandlingRequest/HandlingBody';
import HandlingHeader from './ComponentHandlingRequest/HandlingHeader';

export default function HandlingPage() {
	const inititalState = {
		note: '',
		status: 'Damage',
		date: moment(Date.now()),
		file: '',
		assets: ''
	};
	const [dataAssets, setDataAssets] = useState();
	const dispatch = useDispatch();
	return (
		<FusePageCardedFix
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<HandlingHeader />}
			content={
				<HandlingBody
					dispatch={dispatch}
					setDataAssets={setDataAssets}
					dataAssets={dataAssets}
					inititalState={inititalState}
				/>
			}
			innerScroll
		/>
	);
}
