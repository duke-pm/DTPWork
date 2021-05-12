import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

export default function HandlingHeader() {
	const history = useHistory();
	const handleBack = () => {
		history.goBack();
	};
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<IconButton onClick={handleBack}>
						<ArrowBackIcon />
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<p className="hidden text-white sm:flex mx-0 sm:mx-12 text-23">Báo hỏng/mất tài sản</p>
				</FuseAnimate>
			</div>
		</div>
	);
}
