import { getDataListMenu } from '@fuse/core/DtpConfig';
import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';

function Navigation(props) {
	const navigation = getDataListMenu();
	const { lstPermissionItem } = navigation;
	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={lstPermissionItem}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
