import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon } from '@material-ui/core';
import React from 'react';

export default function HandlingHeader() {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<p className="hidden text-white sm:flex mx-0 sm:mx-12 text-23">Báo hỏng/mất tài sản</p>
				</FuseAnimate>
			</div>
		</div>
	);
}