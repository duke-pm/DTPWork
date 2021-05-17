import FuseAnimate from '@fuse/core/FuseAnimate';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RequestProviderHeader() {
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
					<p className="hidden text-white sm:flex mx-0 sm:mx-12 text-23">Yêu cầu cấp phát tài sản</p>
				</FuseAnimate>
			</div>
		</div>
	);
}
