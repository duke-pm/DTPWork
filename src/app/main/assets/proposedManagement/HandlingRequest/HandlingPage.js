import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography } from '@material-ui/core';
import HandlingBody from './ComponentHandlingRequest/HandlingBody';

export default function HandlingPage() {
	const [dataAssets, setDataAssets] = useState();
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.tabs }), shallowEqual);
	const { value } = currentState;
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
			contentToolbar={
				<div className="flex  items-center px-16 flex-1">
					<Typography variant="h6"> Báo {value === 1 ? 'hỏng' : 'mất'} tài sản</Typography>
				</div>
			}
			content={
				<HandlingBody value={value} dispatch={dispatch} setDataAssets={setDataAssets} dataAssets={dataAssets} />
			}
			innerScroll
		/>
	);
}
