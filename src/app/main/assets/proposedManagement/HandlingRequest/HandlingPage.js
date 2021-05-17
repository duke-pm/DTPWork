import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as moment from 'moment';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography } from '@material-ui/core';
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
		<FusePageCarded
			classes={{
				// content: 'flex',
				header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<div className="flex flex-1 flex-col items-center sm:items-start">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography
								className="text-16 sm:text-20 truncate"
								// component={Link}
								// role="button"
								// to="/apps/e-commerce/orders"
								color="inherit"
							>
								{/* {xhtm} */}
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
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
